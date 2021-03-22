package tcobject

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"

	"github.com/cenkalti/backoff/v3"
	"github.com/orcaman/writerseeker"
	"github.com/taskcluster/httpbackoff/v3"
)

type HTTPRetryError struct {
	Attempts int
	Err      error
}

func (re HTTPRetryError) Error() string {
	return re.Err.Error()
}

// DownloadToBuf is a convenience method to download an object to an in-memory
// byte slice. Returns the object itself, the Content-Type and Content-Length of
// the downloaded object.
func (object *Object) DownloadToBuf(name string) (buf []byte, contentType string, contentLength int64, err error) {
	writeSeeker := &writerseeker.WriterSeeker{}
	contentType, contentLength, err = object.DownloadToWriteSeeker(name, writeSeeker)
	if err != nil {
		return
	}
	reader := writeSeeker.BytesReader()
	buf = make([]byte, reader.Len())
	_, err = writeSeeker.BytesReader().Read(buf)
	return
}

// DownloadToFile is a convenience method to download an object to a file. The
// file is overwritten if it already exists. Returns the Content-Type and
// Content-Length of the downloaded object.
func (object *Object) DownloadToFile(name string, filepath string) (contentType string, contentLength int64, err error) {
	writeSeeker, err := os.Create(filepath)
	if err != nil {
		return "", 0, err
	}
	defer func() {
		err2 := writeSeeker.Close()
		if err == nil {
			err = err2
		}
	}()
	return object.DownloadToWriteSeeker(name, writeSeeker)
}

// DownloadToWriteSeeker downloads the named object from the object service and
// writes it to writeSeeker, retrying if intermittent errors occur. Returns
// the Content-Type and Content-Length of the downloaded object.
func (object *Object) DownloadToWriteSeeker(name string, writeSeeker io.WriteSeeker) (contentType string, contentLength int64, err error) {
	downloadObjectResponse, err := object.StartDownload(
		name,
		&DownloadObjectRequest{
			AcceptDownloadMethods: SupportedDownloadMethods{
				Simple: true,
			},
		},
	)
	if err != nil {
		return "", 0, err
	}

	resp := SimpleDownloadResponse{}
	err = json.Unmarshal(*downloadObjectResponse, &resp)
	if err != nil {
		return "", 0, err
	}

	switch resp.Method {
	case "simple":
		url := resp.URL
		return doSimpleDownload(object.HTTPBackoffClient, url, writeSeeker)
	}
	return "", 0, fmt.Errorf("Unknown download method %q in response to object.StartDownload call for object %q with \"acceptDownloadMethods\":{\"simple\":true}", resp.Method, name)
}

func doSimpleDownload(httpBackoffClient *httpbackoff.Client, url string, writeSeeker io.WriteSeeker) (contentType string, contentLength int64, err error) {
	// Calling httpbackoff.Get(url) here would not be sufficient since that
	// function only wraps the HTTP GET call, and it is left for the caller to
	// consume the response body.  We need to retry the GET if there is a
	// failure when reading from the response body, and therefore a custom
	// retry function is used that also reads the full response body.
	retryFunc := func() (resp *http.Response, tempError error, permError error) {
		// Explicitly seek to start here, rather than only after a temp error,
		// since not all temporary errors are caught by this code (e.g. status
		// codes 500-599 are handled by httpbackoff library implicitly).
		_, permError = writeSeeker.Seek(0, io.SeekStart)
		if permError != nil {
			// not being able to seek to start is a problem that is unlikely to
			// be solved with retries with exponential backoff, so give up
			// straight away
			return
		}
		resp, tempError = http.Get(url)
		// httpbackoff handles http status codes, so we can consider all errors worth retrying here
		if tempError != nil {
			// temporary error!
			return
		}
		defer resp.Body.Close()
		contentType = resp.Header.Get("Content-Type")
		contentLength, tempError = io.Copy(writeSeeker, resp.Body)
		return
	}
	var resp *http.Response
	// HTTP status codes handled here automatically
	client := httpBackoffClient
	if client == nil {
		client = &httpbackoff.Client{
			BackOffSettings: backoff.NewExponentialBackOff(),
		}
	}
	var attempts int
	resp, attempts, err = client.Retry(retryFunc)
	if err != nil {
		err = HTTPRetryError{
			Attempts: attempts,
			Err:      err,
		}
	}
	defer resp.Body.Close()
	return
}
