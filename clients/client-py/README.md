# Taskcluster Client for Python

[![Download](https://img.shields.io/badge/pypi-taskcluster-brightgreen)](https://pypi.python.org/pypi/taskcluster)
[![License](https://img.shields.io/badge/license-MPL%202.0-orange.svg)](http://mozilla.org/MPL/2.0)

**A Taskcluster client library for Python.**

This library is a complete interface to Taskcluster in Python.  It provides
both synchronous and asynchronous interfaces for all Taskcluster API methods,
in both Python-2 and Python-3 variants.

## Usage

For a general guide to using Taskcluster clients, see [Calling Taskcluster APIs](https://docs.taskcluster.net/docs/manual/using/api).

### Setup

Before calling an API end-point, you'll need to create a client instance.
There is a class for each service, e.g., `Queue` and `Auth`.  Each takes the
same options, described below.  Note that only `rootUrl` is
required, and it's unusual to configure any other options aside from
`credentials`.

For each service, there are sync and async variants.  The classes under
`taskcluster` (e.g., `taskcluster.Queue`) are Python-2 compatible and operate
synchronously.  The classes under `taskcluster.aio` (e.g.,
`taskcluster.aio.Queue`) require Python >= 3.6.

#### Authentication Options

Here is a simple set-up of an Index client:

```python
import taskcluster
index = taskcluster.Index({
  'rootUrl': 'https://tc.example.com',
  'credentials': {'clientId': 'id', 'accessToken': 'accessToken'},
})
```

The `rootUrl` option is required as it gives the Taskcluster deployment to
which API requests should be sent.  Credentials are only required if the
request is to be authenticated -- many Taskcluster API methods do not require
authentication.

In most cases, the root URL and Taskcluster credentials should be provided in [standard environment variables](https://docs.taskcluster.net/docs/manual/design/env-vars).  Use `taskcluster.optionsFromEnvironment()` to read these variables automatically:

```python
auth = taskcluster.Auth(taskcluster.optionsFromEnvironment())
```

Note that this function does not respect `TASKCLUSTER_PROXY_URL`.  To use the Taskcluster Proxy from within a task:

```python
auth = taskcluster.Auth({'rootUrl': os.environ['TASKCLUSTER_PROXY_URL']})
```

#### Authorized Scopes

If you wish to perform requests on behalf of a third-party that has small set
of scopes than you do. You can specify [which scopes your request should be
allowed to
use](https://docs.taskcluster.net/docs/manual/design/apis/hawk/authorized-scopes),
in the `authorizedScopes` option.

```python
opts = taskcluster.optionsFromEnvironment()
opts['authorizedScopes'] = ['queue:create-task:highest:my-provisioner/my-worker-type']
queue = taskcluster.Queue(opts)
```

#### Other Options

The following additional options are accepted when constructing a client object:

* `signedUrlExpiration` - default value for the `expiration` argument to `buildSignedUrl`
* `maxRetries` - maximum number of times to retry a failed request

### Calling API Methods

API methods are available as methods on the corresponding client object.  For
sync clients, these are sync methods, and for async clients they are async
methods; the calling convention is the same in either case.

There are four calling conventions for methods:

```python
client.method(v1, v1, payload)
client.method(payload, k1=v1, k2=v2)
client.method(payload=payload, query=query, params={k1: v1, k2: v2})
client.method(v1, v2, payload=payload, query=query)
```

Here, `v1` and `v2` are URL parameters (named `k1` and `k2`), `payload` is the
request payload, and `query` is a dictionary of query arguments.

For example, in order to call an API method with query-string arguments:

```python
await queue.listTaskGroup('JzTGxwxhQ76_Tt1dxkaG5g',
  query={'continuationToken': previousResponse.get('continuationToken')})
```


### Generating URLs

It is often necessary to generate the URL for an API method without actually calling the method.
To do so, use `buildUrl` or, for an API method that requires authentication, `buildSignedUrl`.

```python
import taskcluster

index = taskcluster.Index(taskcluster.optionsFromEnvironment())
print(index.buildUrl('findTask', 'builds.v1.latest'))
secrets = taskcluster.Secrets(taskcluster.optionsFromEnvironment())
print(secret.buildSignedUrl('get', 'my-secret'))
```

Note that signed URLs are time-limited; the expiration can be set with the `signedUrlExpiration` option to the client constructor, or with the `expiration` keyword arguement to `buildSignedUrl`, both given in seconds.

### Generating Temporary Credentials

If you have non-temporary taskcluster credentials you can generate a set of
[temporary credentials](https://docs.taskcluster.net/docs/manual/design/apis/hawk/temporary-credentials) as follows. Notice that the credentials cannot last more
than 31 days, and you can only revoke them by revoking the credentials that was
used to issue them (this takes up to one hour).

It is not the responsibility of the caller to apply any clock drift adjustment
to the start or expiry time - this is handled by the auth service directly.

```python
import datetime

start = datetime.datetime.now()
expiry = start + datetime.timedelta(0,60)
scopes = ['ScopeA', 'ScopeB']
name = 'foo'

credentials = taskcluster.createTemporaryCredentials(
    # issuing clientId
    clientId,
    # issuing accessToken
    accessToken,
    # Validity of temporary credentials starts here, in timestamp
    start,
    # Expiration of temporary credentials, in timestamp
    expiry,
    # Scopes to grant the temporary credentials
    scopes,
    # credential name (optional)
    name
)
```

You cannot use temporary credentials to issue new temporary credentials.  You
must have `auth:create-client:<name>` to create a named temporary credential,
but unnamed temporary credentials can be created regardless of your scopes.

### Handling Timestamps
Many taskcluster APIs require ISO 8601 time stamps offset into the future
as way of providing expiration, deadlines, etc. These can be easily created
using `datetime.datetime.isoformat()`, however, it can be rather error prone
and tedious to offset `datetime.datetime` objects into the future. Therefore
this library comes with two utility functions for this purposes.

```python
dateObject = taskcluster.fromNow("2 days 3 hours 1 minute")
  # -> datetime.datetime(2017, 1, 21, 17, 8, 1, 607929)
dateString = taskcluster.fromNowJSON("2 days 3 hours 1 minute")
  # -> '2017-01-21T17:09:23.240178Z'
```

By default it will offset the date time into the future, if the offset strings
are prefixed minus (`-`) the date object will be offset into the past. This is
useful in some corner cases.

```python
dateObject = taskcluster.fromNow("- 1 year 2 months 3 weeks 5 seconds");
  # -> datetime.datetime(2015, 10, 30, 18, 16, 50, 931161)
```

The offset string is ignorant of whitespace and case insensitive. It may also
optionally be prefixed plus `+` (if not prefixed minus), any `+` prefix will be
ignored. However, entries in the offset string must be given in order from
high to low, ie. `2 years 1 day`. Additionally, various shorthands may be
employed, as illustrated below.

```
  years,    year,   yr,   y
  months,   month,  mo
  weeks,    week,         w
  days,     day,          d
  hours,    hour,         h
  minutes,  minute, min
  seconds,  second, sec,  s
```

The `fromNow` method may also be given a date to be relative to as a second
argument. This is useful if offset the task expiration relative to the the task
deadline or doing something similar.  This argument can also be passed as the
kwarg `dateObj`

```python
dateObject1 = taskcluster.fromNow("2 days 3 hours");
dateObject2 = taskcluster.fromNow("1 year", dateObject1);
taskcluster.fromNow("1 year", dateObj=dateObject1);
  # -> datetime.datetime(2018, 1, 21, 17, 59, 0, 328934)
```
### Generating SlugIDs

To generate slugIds (Taskcluster's client-generated unique IDs), use
`taskcluster.slugId()`, which will return a unique slugId on each call.

In some cases it is useful to be able to create a mapping from names to
slugIds, with the ability to generate the same slugId multiple times.
The `taskcluster.stableSlugId()` function returns a callable that does
just this.

```python
gen = taskcluster.stableSlugId()
sometask = gen('sometask')
assert gen('sometask') == sometask  # same input generates same output
assert gen('sometask') != gen('othertask')

gen2 = taskcluster.stableSlugId()
sometask2 = gen('sometask')
assert sometask2 != sometask  # but different slugId generators produce
                              # different output
```

### Scope Analysis

The `scopeMatch(assumedScopes, requiredScopeSets)` function determines
whether one or more of a set of required scopes are satisfied by the assumed
scopes, taking *-expansion into account.  This is useful for making local
decisions on scope satisfaction, but note that `assumed_scopes` must be the
*expanded* scopes, as this function cannot perform expansion.

It takes a list of a assumed scopes, and a list of required scope sets on
disjunctive normal form, and checks if any of the required scope sets are
satisfied.

Example:

```python
requiredScopeSets = [
    ["scopeA", "scopeB"],
    ["scopeC:*"]
]
assert scopesMatch(['scopeA', 'scopeB'], requiredScopeSets)
assert scopesMatch(['scopeC:xyz'], requiredScopeSets)
assert not scopesMatch(['scopeA'], requiredScopeSets)
assert not scopesMatch(['scopeC'], requiredScopeSets)
```

### Pagination

Many Taskcluster API methods are paginated.  There are two ways to handle
pagination easily with the python client.  The first is to implement pagination
in your code:

```python
import taskcluster
queue = taskcluster.Queue({'rootUrl': 'https://tc.example.com'})
i = 0
tasks = 0
outcome = queue.listTaskGroup('JzTGxwxhQ76_Tt1dxkaG5g')
while outcome.get('continuationToken'):
    print('Response %d gave us %d more tasks' % (i, len(outcome['tasks'])))
    if outcome.get('continuationToken'):
        outcome = queue.listTaskGroup('JzTGxwxhQ76_Tt1dxkaG5g', query={'continuationToken': outcome.get('continuationToken')})
    i += 1
    tasks += len(outcome.get('tasks', []))
print('Task Group %s has %d tasks' % (outcome['taskGroupId'], tasks))
```

There's also an experimental feature to support built in automatic pagination
in the sync client.  This feature allows passing a callback as the
'paginationHandler' keyword-argument.  This function will be passed the
response body of the API method as its sole positional arugment.

This example of the built in pagination shows how a list of tasks could be
built and then counted:

```python
import taskcluster
queue = taskcluster.Queue({'rootUrl': 'https://tc.example.com'})

responses = []

def handle_page(y):
    print("%d tasks fetched" % len(y.get('tasks', [])))
    responses.append(y)

queue.listTaskGroup('JzTGxwxhQ76_Tt1dxkaG5g', paginationHandler=handle_page)

tasks = 0
for response in responses:
    tasks += len(response.get('tasks', []))

print("%d requests fetch %d tasks" % (len(responses), tasks))
```

### Pulse Events

This library can generate exchange patterns for Pulse messages based on the
Exchanges definitions provded by each service.  This is done by instantiating a
`<service>Events` class and calling a method with the name of the vent.
Options for the topic exchange methods can be in the form of either a single
dictionary argument or keyword arguments.  Only one form is allowed.

```python
from taskcluster import client
qEvt = client.QueueEvents({rootUrl: 'https://tc.example.com'})
# The following calls are equivalent
print(qEvt.taskCompleted({'taskId': 'atask'}))
print(qEvt.taskCompleted(taskId='atask'))
```

Note that the client library does *not* provide support for interfacing with a Pulse server.

### Logging

Logging is set up in `taskcluster/__init__.py`.  If the special
`DEBUG_TASKCLUSTER_CLIENT` environment variable is set, the `__init__.py`
module will set the `logging` module's level for its logger to `logging.DEBUG`
and if there are no existing handlers, add a `logging.StreamHandler()`
instance.  This is meant to assist those who do not wish to bother figuring out
how to configure the python logging module but do want debug messages

## Integration Helpers

The Python Taskcluster client has a module `taskcluster.helper` with utilities which allows you to easily share authentication options across multiple services in your project.

Generally a project using this library will face different use cases and authentication options:

* No authentication for a new contributor without Taskcluster access,
* Specific client credentials through environment variables on a developer's computer,
* Taskcluster Proxy when running inside a task.

### Shared authentication

The class `taskcluster.helper.TaskclusterConfig` is made to be instantiated once in your project, usually in a top level module. That singleton is then accessed by different parts of your projects, whenever a Taskcluster service is needed.

Here is a sample usage:

1. in `project/__init__.py`, no call to Taskcluster is made at that point:

```python
from taskcluster.helper import Taskcluster config

tc = TaskclusterConfig('https://community-tc.services.mozilla.com')
```

2. in `project/boot.py`, we authenticate on Taskcuster with provided credentials, or environment variables, or taskcluster proxy (in that order):

```python
from project import tc

tc.auth(client_id='XXX', access_token='YYY')
```

3. at that point, you can load any service using the authenticated wrapper from anywhere in your code:

```python
from project import tc

def sync_usage():
    queue = tc.get_service('queue')
    queue.ping()

async def async_usage():
    hooks = tc.get_service('hooks', use_async=True)  # Asynchronous service class
    await hooks.ping()
```

Supported environment variables are:
- `TASKCLUSTER_ROOT_URL` to specify your Taskcluster instance base url. You can either use that variable or instanciate `TaskclusterConfig` with the base url.
- `TASKCLUSTER_CLIENT_ID` & `TASKCLUSTER_ACCESS_TOKEN` to specify your client credentials instead of providing them to `TaskclusterConfig.auth`
- `TASKCLUSTER_PROXY_URL` to specify the proxy address used to reach Taskcluster in a task. It defaults to `http://taskcluster` when not specified.

For more details on Taskcluster environment variables, [here is the documentation](https://docs.taskcluster.net/docs/manual/design/env-vars).

### Loading secrets across multiple authentications

Another available utility is `taskcluster.helper.load_secrets` which allows you to retrieve a secret using an authenticated `taskcluster.Secrets` instance (using `TaskclusterConfig.get_service` or the synchronous class directly). 

This utility loads a secret, but allows you to:
1. share a secret across multiple projects, by using key prefixes inside the secret,
2. check that some required keys are present in the secret,
3. provide some default values,
4. provide a local secret source instead of using the Taskcluster service (useful for local development or sharing _secrets_ with contributors)

Let's say you have a secret on a Taskcluster instance named `project/foo/prod-config`, which is needed by a backend and some tasks. Here is its content:

```yaml
common:
  environment: production
  remote_log: https://log.xx.com/payload

backend:
  bugzilla_token: XXXX

task:
  backend_url: https://backend.foo.mozilla.com
```

In your backend, you would do:

```python
from taskcluster import Secrets
from taskcluster.helper import load_secrets

prod_config = load_secrets(
  Secrets({...}),
  'project/foo/prod-config',

  # We only need the common & backend parts
  prefixes=['common', 'backend'],

  # We absolutely need a bugzilla token to run
  required=['bugzilla_token'],

  # Let's provide some default value for the environment
  existing={
    'environment': 'dev',
  }
)
  # -> prod_config == {
  #     "environment": "production"
  #     "remote_log": "https://log.xx.com/payload",
  #     "bugzilla_token": "XXXX",
  #   }
```

In your task, you could do the following using `TaskclusterConfig` mentionned above (the class has a shortcut to use an authenticated `Secrets` service automatically):

```python
from project import tc

prod_config = tc.load_secrets(
  'project/foo/prod-config',

  # We only need the common & bot parts
  prefixes=['common', 'bot'],

  # Let's provide some default value for the environment and backend_url
  existing={
    'environment': 'dev',
    'backend_url': 'http://localhost:8000',
  }
)
  # -> prod_config == {
  #     "environment": "production"
  #     "remote_log": "https://log.xx.com/payload",
  #     "backend_url": "https://backend.foo.mozilla.com",
  #   }
```

To provide local secrets value, you first need to load these values as a dictionary (usually by reading a local file in your format of choice : YAML, JSON, ...) and providing the dictionary to `load_secrets` by using the `local_secrets` parameter:

```python
import os
import yaml

from taskcluster import Secrets
from taskcluster.helper import load_secrets

local_path = 'path/to/file.yml'

prod_config = load_secrets(
  Secrets({...}),
  'project/foo/prod-config',

  # We support an optional local file to provide some configuration without reaching Taskcluster
  local_secrets=yaml.safe_load(open(local_path)) if os.path.exists(local_path) else None,
)
```

### Uploading artifacts during the task execution

Most artifacts are automatically uploaded at the end of a task execution, but if you need to upload them during the task execution, here is an helper function to do that: `taskcluster.helper.upload_artifact`.

It will directly do the two steps upload through Taskcluster proxy (this cannot work from your computer):

1. use `createArtifact` on a pre-configured queue service, setting artifact path, content type & expiration date
2. upload the file on Amazon S3 through the short lived url provided by Taskcluster

Here is an example of direct usage of that function:


```python
from taskcluster import Queue
from taskcluster.helper import upload_artifact
from datetime import timedelta

artifact_url = upload_artifact(
  Queue({...}),

	# The artifact path exposed to users
  'myproject/file.txt',

  # The artifact content as a string
  'My super payload !',

  # Content type of the artifact
  'text/plain',

  # Artifact Time to live using a timedelta
	timedelta(days=10),
)  # -> artifact_url = '/api/queue/v1/task/<taskid>/runs/<runid>/artifacts/myproject/file.txt'
```

This method is also exposed in `TaskclusterConfig` and will use the current authentification:

```python
from project import tc

artifact_url = tc.load_secrets(
	# The artifact path exposed to users
  'myproject/file.txt',

  # The artifact content as a string
  'My super payload !',

  # Content type of the artifact
  'text/plain',

  # Artifact Time to live using a timedelta
	timedelta(days=10),
)
```

## Compatibility

This library is co-versioned with Taskcluster itself.
That is, a client with version x.y.z contains API methods corresponding to Taskcluster version x.y.z.
Taskcluster is careful to maintain API compatibility, and guarantees it within a major version.
That means that any client with version x.* will work against any Taskcluster services at version x.*, and is very likely to work for many other major versions of the Taskcluster services.
Any incompatibilities are noted in the [Changelog](https://github.com/taskcluster/taskcluster/blob/main/CHANGELOG.md).




