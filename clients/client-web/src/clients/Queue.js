// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import Client from '../Client';

export default class Queue extends Client {
  constructor(options = {}) {
    super({
      serviceName: 'queue',
      serviceVersion: 'v1',
      exchangePrefix: '',
      ...options,
    });
    this.ping.entry = {"args":[],"category":"Ping Server","method":"get","name":"ping","query":[],"route":"/ping","stability":"stable","type":"function"}; // eslint-disable-line
    this.task.entry = {"args":["taskId"],"category":"Tasks","method":"get","name":"task","output":true,"query":[],"route":"/task/<taskId>","scopes":"queue:get-task:<taskId>","stability":"stable","type":"function"}; // eslint-disable-line
    this.status.entry = {"args":["taskId"],"category":"Tasks","method":"get","name":"status","output":true,"query":[],"route":"/task/<taskId>/status","scopes":"queue:status:<taskId>","stability":"stable","type":"function"}; // eslint-disable-line
    this.listTaskGroup.entry = {"args":["taskGroupId"],"category":"Tasks","method":"get","name":"listTaskGroup","output":true,"query":["continuationToken","limit"],"route":"/task-group/<taskGroupId>/list","scopes":"queue:list-task-group:<taskGroupId>","stability":"stable","type":"function"}; // eslint-disable-line
    this.listDependentTasks.entry = {"args":["taskId"],"category":"Tasks","method":"get","name":"listDependentTasks","output":true,"query":["continuationToken","limit"],"route":"/task/<taskId>/dependents","scopes":"queue:list-dependent-tasks:<taskId>","stability":"stable","type":"function"}; // eslint-disable-line
    this.createTask.entry = {"args":["taskId"],"category":"Tasks","input":true,"method":"put","name":"createTask","output":true,"query":[],"route":"/task/<taskId>","scopes":{"AllOf":[{"each":"<scope>","for":"scope","in":"scopes"},{"each":"queue:route:<route>","for":"route","in":"routes"},"queue:create-task:project:<projectId>","queue:scheduler-id:<schedulerId>",{"AnyOf":[{"each":"queue:create-task:<priority>:<provisionerId>/<workerType>","for":"priority","in":"priorities"}]}]},"stability":"stable","type":"function"}; // eslint-disable-line
    this.scheduleTask.entry = {"args":["taskId"],"category":"Tasks","method":"post","name":"scheduleTask","output":true,"query":[],"route":"/task/<taskId>/schedule","scopes":{"AnyOf":["queue:schedule-task:<schedulerId>/<taskGroupId>/<taskId>","queue:schedule-task-in-project:<projectId>",{"AllOf":["queue:schedule-task","assume:scheduler-id:<schedulerId>/<taskGroupId>"]}]},"stability":"stable","type":"function"}; // eslint-disable-line
    this.rerunTask.entry = {"args":["taskId"],"category":"Tasks","method":"post","name":"rerunTask","output":true,"query":[],"route":"/task/<taskId>/rerun","scopes":{"AnyOf":["queue:rerun-task:<schedulerId>/<taskGroupId>/<taskId>","queue:rerun-task-in-project:<projectId>",{"AllOf":["queue:rerun-task","assume:scheduler-id:<schedulerId>/<taskGroupId>"]}]},"stability":"stable","type":"function"}; // eslint-disable-line
    this.cancelTask.entry = {"args":["taskId"],"category":"Tasks","method":"post","name":"cancelTask","output":true,"query":[],"route":"/task/<taskId>/cancel","scopes":{"AnyOf":["queue:cancel-task:<schedulerId>/<taskGroupId>/<taskId>","queue:cancel-task-in-project:<projectId>",{"AllOf":["queue:cancel-task","assume:scheduler-id:<schedulerId>/<taskGroupId>"]}]},"stability":"stable","type":"function"}; // eslint-disable-line
    this.claimWork.entry = {"args":["taskQueueId"],"category":"Worker Interface","input":true,"method":"post","name":"claimWork","output":true,"query":[],"route":"/claim-work/<taskQueueId>","scopes":{"AllOf":["queue:claim-work:<taskQueueId>","queue:worker-id:<workerGroup>/<workerId>"]},"stability":"stable","type":"function"}; // eslint-disable-line
    this.claimTask.entry = {"args":["taskId","runId"],"category":"Worker Interface","input":true,"method":"post","name":"claimTask","output":true,"query":[],"route":"/task/<taskId>/runs/<runId>/claim","scopes":{"AllOf":["queue:claim-task:<provisionerId>/<workerType>","queue:worker-id:<workerGroup>/<workerId>"]},"stability":"deprecated","type":"function"}; // eslint-disable-line
    this.reclaimTask.entry = {"args":["taskId","runId"],"category":"Worker Interface","method":"post","name":"reclaimTask","output":true,"query":[],"route":"/task/<taskId>/runs/<runId>/reclaim","scopes":"queue:reclaim-task:<taskId>/<runId>","stability":"stable","type":"function"}; // eslint-disable-line
    this.reportCompleted.entry = {"args":["taskId","runId"],"category":"Worker Interface","method":"post","name":"reportCompleted","output":true,"query":[],"route":"/task/<taskId>/runs/<runId>/completed","scopes":"queue:resolve-task:<taskId>/<runId>","stability":"stable","type":"function"}; // eslint-disable-line
    this.reportFailed.entry = {"args":["taskId","runId"],"category":"Worker Interface","method":"post","name":"reportFailed","output":true,"query":[],"route":"/task/<taskId>/runs/<runId>/failed","scopes":"queue:resolve-task:<taskId>/<runId>","stability":"stable","type":"function"}; // eslint-disable-line
    this.reportException.entry = {"args":["taskId","runId"],"category":"Worker Interface","input":true,"method":"post","name":"reportException","output":true,"query":[],"route":"/task/<taskId>/runs/<runId>/exception","scopes":"queue:resolve-task:<taskId>/<runId>","stability":"stable","type":"function"}; // eslint-disable-line
    this.createArtifact.entry = {"args":["taskId","runId","name"],"category":"Artifacts","input":true,"method":"post","name":"createArtifact","output":true,"query":[],"route":"/task/<taskId>/runs/<runId>/artifacts/<name>","scopes":"queue:create-artifact:<taskId>/<runId>","stability":"stable","type":"function"}; // eslint-disable-line
    this.getArtifact.entry = {"args":["taskId","runId","name"],"category":"Artifacts","method":"get","name":"getArtifact","output":true,"query":[],"route":"/task/<taskId>/runs/<runId>/artifacts/<name>","scopes":{"AllOf":[{"each":"queue:get-artifact:<name>","for":"name","in":"names"}]},"stability":"stable","type":"function"}; // eslint-disable-line
    this.getLatestArtifact.entry = {"args":["taskId","name"],"category":"Artifacts","method":"get","name":"getLatestArtifact","output":true,"query":[],"route":"/task/<taskId>/artifacts/<name>","scopes":{"AllOf":[{"each":"queue:get-artifact:<name>","for":"name","in":"names"}]},"stability":"stable","type":"function"}; // eslint-disable-line
    this.listArtifacts.entry = {"args":["taskId","runId"],"category":"Artifacts","method":"get","name":"listArtifacts","output":true,"query":["continuationToken","limit"],"route":"/task/<taskId>/runs/<runId>/artifacts","scopes":"queue:list-artifacts:<taskId>:<runId>","stability":"stable","type":"function"}; // eslint-disable-line
    this.listLatestArtifacts.entry = {"args":["taskId"],"category":"Artifacts","method":"get","name":"listLatestArtifacts","output":true,"query":["continuationToken","limit"],"route":"/task/<taskId>/artifacts","scopes":"queue:list-artifacts:<taskId>","stability":"stable","type":"function"}; // eslint-disable-line
    this.listProvisioners.entry = {"args":[],"category":"Worker Metadata","method":"get","name":"listProvisioners","output":true,"query":["continuationToken","limit"],"route":"/provisioners","scopes":"queue:list-provisioners","stability":"deprecated","type":"function"}; // eslint-disable-line
    this.getProvisioner.entry = {"args":["provisionerId"],"category":"Worker Metadata","method":"get","name":"getProvisioner","output":true,"query":[],"route":"/provisioners/<provisionerId>","scopes":"queue:get-provisioner:<provisionerId>","stability":"deprecated","type":"function"}; // eslint-disable-line
    this.declareProvisioner.entry = {"args":["provisionerId"],"category":"Worker Metadata","input":true,"method":"put","name":"declareProvisioner","output":true,"query":[],"route":"/provisioners/<provisionerId>","scopes":{"AllOf":[{"each":"queue:declare-provisioner:<provisionerId>#<property>","for":"property","in":"properties"}]},"stability":"deprecated","type":"function"}; // eslint-disable-line
    this.pendingTasks.entry = {"args":["taskQueueId"],"category":"Worker Metadata","method":"get","name":"pendingTasks","output":true,"query":[],"route":"/pending/<taskQueueId>","scopes":"queue:pending-count:<taskQueueId>","stability":"stable","type":"function"}; // eslint-disable-line
    this.listWorkerTypes.entry = {"args":["provisionerId"],"category":"Worker Metadata","method":"get","name":"listWorkerTypes","output":true,"query":["continuationToken","limit"],"route":"/provisioners/<provisionerId>/worker-types","scopes":"queue:list-worker-types:<provisionerId>","stability":"deprecated","type":"function"}; // eslint-disable-line
    this.getWorkerType.entry = {"args":["provisionerId","workerType"],"category":"Worker Metadata","method":"get","name":"getWorkerType","output":true,"query":[],"route":"/provisioners/<provisionerId>/worker-types/<workerType>","scopes":"queue:get-worker-type:<provisionerId>/<workerType>","stability":"deprecated","type":"function"}; // eslint-disable-line
    this.declareWorkerType.entry = {"args":["provisionerId","workerType"],"category":"Worker Metadata","input":true,"method":"put","name":"declareWorkerType","output":true,"query":[],"route":"/provisioners/<provisionerId>/worker-types/<workerType>","scopes":{"AllOf":[{"each":"queue:declare-worker-type:<provisionerId>/<workerType>#<property>","for":"property","in":"properties"}]},"stability":"deprecated","type":"function"}; // eslint-disable-line
    this.listTaskQueues.entry = {"args":[],"category":"Worker Metadata","method":"get","name":"listTaskQueues","output":true,"query":["continuationToken","limit"],"route":"/task-queues","scopes":"queue:list-task-queues","stability":"stable","type":"function"}; // eslint-disable-line
    this.getTaskQueue.entry = {"args":["taskQueueId"],"category":"Worker Metadata","method":"get","name":"getTaskQueue","output":true,"query":[],"route":"/task-queues/<taskQueueId>","scopes":"queue:get-task-queue:<taskQueueId>","stability":"stable","type":"function"}; // eslint-disable-line
    this.listWorkers.entry = {"args":["provisionerId","workerType"],"category":"Worker Metadata","method":"get","name":"listWorkers","output":true,"query":["continuationToken","limit","quarantined"],"route":"/provisioners/<provisionerId>/worker-types/<workerType>/workers","scopes":"queue:list-workers:<provisionerId>/<workerType>","stability":"experimental","type":"function"}; // eslint-disable-line
    this.getWorker.entry = {"args":["provisionerId","workerType","workerGroup","workerId"],"category":"Worker Metadata","method":"get","name":"getWorker","output":true,"query":[],"route":"/provisioners/<provisionerId>/worker-types/<workerType>/workers/<workerGroup>/<workerId>","scopes":"queue:get-worker:<provisionerId>/<workerType>/<workerGroup>/<workerId>","stability":"experimental","type":"function"}; // eslint-disable-line
    this.quarantineWorker.entry = {"args":["provisionerId","workerType","workerGroup","workerId"],"category":"Worker Metadata","input":true,"method":"put","name":"quarantineWorker","output":true,"query":[],"route":"/provisioners/<provisionerId>/worker-types/<workerType>/workers/<workerGroup>/<workerId>","scopes":{"AllOf":["queue:quarantine-worker:<provisionerId>/<workerType>/<workerGroup>/<workerId>"]},"stability":"experimental","type":"function"}; // eslint-disable-line
    this.declareWorker.entry = {"args":["provisionerId","workerType","workerGroup","workerId"],"category":"Worker Metadata","input":true,"method":"put","name":"declareWorker","output":true,"query":[],"route":"/provisioners/<provisionerId>/worker-types/<workerType>/<workerGroup>/<workerId>","scopes":{"AllOf":[{"each":"queue:declare-worker:<provisionerId>/<workerType>/<workerGroup>/<workerId>#<property>","for":"property","in":"properties"}]},"stability":"experimental","type":"function"}; // eslint-disable-line
  }
  /* eslint-disable max-len */
  // Respond without doing anything.
  // This endpoint is used to check that the service is up.
  /* eslint-enable max-len */
  ping(...args) {
    this.validate(this.ping.entry, args);

    return this.request(this.ping.entry, args);
  }
  /* eslint-disable max-len */
  // This end-point will return the task-definition. Notice that the task
  // definition may have been modified by queue, if an optional property is
  // not specified the queue may provide a default value.
  /* eslint-enable max-len */
  task(...args) {
    this.validate(this.task.entry, args);

    return this.request(this.task.entry, args);
  }
  /* eslint-disable max-len */
  // Get task status structure from `taskId`
  /* eslint-enable max-len */
  status(...args) {
    this.validate(this.status.entry, args);

    return this.request(this.status.entry, args);
  }
  /* eslint-disable max-len */
  // List tasks sharing the same `taskGroupId`.
  // As a task-group may contain an unbounded number of tasks, this end-point
  // may return a `continuationToken`. To continue listing tasks you must call
  // the `listTaskGroup` again with the `continuationToken` as the
  // query-string option `continuationToken`.
  // By default this end-point will try to return up to 1000 members in one
  // request. But it **may return less**, even if more tasks are available.
  // It may also return a `continuationToken` even though there are no more
  // results. However, you can only be sure to have seen all results if you
  // keep calling `listTaskGroup` with the last `continuationToken` until you
  // get a result without a `continuationToken`.
  // If you are not interested in listing all the members at once, you may
  // use the query-string option `limit` to return fewer.
  /* eslint-enable max-len */
  listTaskGroup(...args) {
    this.validate(this.listTaskGroup.entry, args);

    return this.request(this.listTaskGroup.entry, args);
  }
  /* eslint-disable max-len */
  // List tasks that depend on the given `taskId`.
  // As many tasks from different task-groups may dependent on a single tasks,
  // this end-point may return a `continuationToken`. To continue listing
  // tasks you must call `listDependentTasks` again with the
  // `continuationToken` as the query-string option `continuationToken`.
  // By default this end-point will try to return up to 1000 tasks in one
  // request. But it **may return less**, even if more tasks are available.
  // It may also return a `continuationToken` even though there are no more
  // results. However, you can only be sure to have seen all results if you
  // keep calling `listDependentTasks` with the last `continuationToken` until
  // you get a result without a `continuationToken`.
  // If you are not interested in listing all the tasks at once, you may
  // use the query-string option `limit` to return fewer.
  /* eslint-enable max-len */
  listDependentTasks(...args) {
    this.validate(this.listDependentTasks.entry, args);

    return this.request(this.listDependentTasks.entry, args);
  }
  /* eslint-disable max-len */
  // Create a new task, this is an **idempotent** operation, so repeat it if
  // you get an internal server error or network connection is dropped.
  // **Task `deadline`**: the deadline property can be no more than 5 days
  // into the future. This is to limit the amount of pending tasks not being
  // taken care of. Ideally, you should use a much shorter deadline.
  // **Task expiration**: the `expires` property must be greater than the
  // task `deadline`. If not provided it will default to `deadline` + one
  // year. Notice, that artifacts created by task must expire before the task.
  // **Task specific routing-keys**: using the `task.routes` property you may
  // define task specific routing-keys. If a task has a task specific
  // routing-key: `<route>`, then when the AMQP message about the task is
  // published, the message will be CC'ed with the routing-key:
  // `route.<route>`. This is useful if you want another component to listen
  // for completed tasks you have posted.  The caller must have scope
  // `queue:route:<route>` for each route.
  // **Dependencies**: any tasks referenced in `task.dependencies` must have
  // already been created at the time of this call.
  // **Scopes**: Note that the scopes required to complete this API call depend
  // on the content of the `scopes`, `routes`, `schedulerId`, `priority`,
  // `provisionerId`, and `workerType` properties of the task definition.
  /* eslint-enable max-len */
  createTask(...args) {
    this.validate(this.createTask.entry, args);

    return this.request(this.createTask.entry, args);
  }
  /* eslint-disable max-len */
  // scheduleTask will schedule a task to be executed, even if it has
  // unresolved dependencies. A task would otherwise only be scheduled if
  // its dependencies were resolved.
  // This is useful if you have defined a task that depends on itself or on
  // some other task that has not been resolved, but you wish the task to be
  // scheduled immediately.
  // This will announce the task as pending and workers will be allowed to
  // claim it and resolve the task.
  // **Note** this operation is **idempotent** and will not fail or complain
  // if called with a `taskId` that is already scheduled, or even resolved.
  // To reschedule a task previously resolved, use `rerunTask`.
  /* eslint-enable max-len */
  scheduleTask(...args) {
    this.validate(this.scheduleTask.entry, args);

    return this.request(this.scheduleTask.entry, args);
  }
  /* eslint-disable max-len */
  // This method _reruns_ a previously resolved task, even if it was
  // _completed_. This is useful if your task completes unsuccessfully, and
  // you just want to run it from scratch again. This will also reset the
  // number of `retries` allowed.
  // This method is deprecated in favour of creating a new task with the same
  // task definition (but with a new taskId).
  // Remember that `retries` in the task status counts the number of runs that
  // the queue have started because the worker stopped responding, for example
  // because a spot node died.
  // **Remark** this operation is idempotent, if you try to rerun a task that
  // is not either `failed` or `completed`, this operation will just return
  // the current task status.
  /* eslint-enable max-len */
  rerunTask(...args) {
    this.validate(this.rerunTask.entry, args);

    return this.request(this.rerunTask.entry, args);
  }
  /* eslint-disable max-len */
  // This method will cancel a task that is either `unscheduled`, `pending` or
  // `running`. It will resolve the current run as `exception` with
  // `reasonResolved` set to `canceled`. If the task isn't scheduled yet, ie.
  // it doesn't have any runs, an initial run will be added and resolved as
  // described above. Hence, after canceling a task, it cannot be scheduled
  // with `queue.scheduleTask`, but a new run can be created with
  // `queue.rerun`. These semantics is equivalent to calling
  // `queue.scheduleTask` immediately followed by `queue.cancelTask`.
  // **Remark** this operation is idempotent, if you try to cancel a task that
  // isn't `unscheduled`, `pending` or `running`, this operation will just
  // return the current task status.
  /* eslint-enable max-len */
  cancelTask(...args) {
    this.validate(this.cancelTask.entry, args);

    return this.request(this.cancelTask.entry, args);
  }
  /* eslint-disable max-len */
  // Claim pending task(s) for the given task queue.
  // If any work is available (even if fewer than the requested number of
  // tasks, this will return immediately. Otherwise, it will block for tens of
  // seconds waiting for work.  If no work appears, it will return an emtpy
  // list of tasks.  Callers should sleep a short while (to avoid denial of
  // service in an error condition) and call the endpoint again.  This is a
  // simple implementation of "long polling".
  /* eslint-enable max-len */
  claimWork(...args) {
    this.validate(this.claimWork.entry, args);

    return this.request(this.claimWork.entry, args);
  }
  /* eslint-disable max-len */
  // claim a task - never documented
  /* eslint-enable max-len */
  claimTask(...args) {
    this.validate(this.claimTask.entry, args);

    return this.request(this.claimTask.entry, args);
  }
  /* eslint-disable max-len */
  // Refresh the claim for a specific `runId` for given `taskId`. This updates
  // the `takenUntil` property and returns a new set of temporary credentials
  // for performing requests on behalf of the task. These credentials should
  // be used in-place of the credentials returned by `claimWork`.
  // The `reclaimTask` requests serves to:
  //  * Postpone `takenUntil` preventing the queue from resolving
  //    `claim-expired`,
  //  * Refresh temporary credentials used for processing the task, and
  //  * Abort execution if the task/run have been resolved.
  // If the `takenUntil` timestamp is exceeded the queue will resolve the run
  // as _exception_ with reason `claim-expired`, and proceeded to retry to the
  // task. This ensures that tasks are retried, even if workers disappear
  // without warning.
  // If the task is resolved, this end-point will return `409` reporting
  // `RequestConflict`. This typically happens if the task have been canceled
  // or the `task.deadline` have been exceeded. If reclaiming fails, workers
  // should abort the task and forget about the given `runId`. There is no
  // need to resolve the run or upload artifacts.
  /* eslint-enable max-len */
  reclaimTask(...args) {
    this.validate(this.reclaimTask.entry, args);

    return this.request(this.reclaimTask.entry, args);
  }
  /* eslint-disable max-len */
  // Report a task completed, resolving the run as `completed`.
  /* eslint-enable max-len */
  reportCompleted(...args) {
    this.validate(this.reportCompleted.entry, args);

    return this.request(this.reportCompleted.entry, args);
  }
  /* eslint-disable max-len */
  // Report a run failed, resolving the run as `failed`. Use this to resolve
  // a run that failed because the task specific code behaved unexpectedly.
  // For example the task exited non-zero, or didn't produce expected output.
  // Do not use this if the task couldn't be run because if malformed
  // payload, or other unexpected condition. In these cases we have a task
  // exception, which should be reported with `reportException`.
  /* eslint-enable max-len */
  reportFailed(...args) {
    this.validate(this.reportFailed.entry, args);

    return this.request(this.reportFailed.entry, args);
  }
  /* eslint-disable max-len */
  // Resolve a run as _exception_. Generally, you will want to report tasks as
  // failed instead of exception. You should `reportException` if,
  //   * The `task.payload` is invalid,
  //   * Non-existent resources are referenced,
  //   * Declared actions cannot be executed due to unavailable resources,
  //   * The worker had to shutdown prematurely,
  //   * The worker experienced an unknown error, or,
  //   * The task explicitly requested a retry.
  // Do not use this to signal that some user-specified code crashed for any
  // reason specific to this code. If user-specific code hits a resource that
  // is temporarily unavailable worker should report task _failed_.
  /* eslint-enable max-len */
  reportException(...args) {
    this.validate(this.reportException.entry, args);

    return this.request(this.reportException.entry, args);
  }
  /* eslint-disable max-len */
  // This API end-point creates an artifact for a specific run of a task. This
  // should **only** be used by a worker currently operating on this task, or
  // from a process running within the task (ie. on the worker).
  // All artifacts must specify when they `expires`, the queue will
  // automatically take care of deleting artifacts past their
  // expiration point. This features makes it feasible to upload large
  // intermediate artifacts from data processing applications, as the
  // artifacts can be set to expire a few days later.
  // We currently support "S3 Artifacts" for data storage.
  // **S3 artifacts**, is useful for static files which will be
  // stored on S3. When creating an S3 artifact the queue will return a
  // pre-signed URL to which you can do a `PUT` request to upload your
  // artifact. Note that `PUT` request **must** specify the `content-length`
  // header and **must** give the `content-type` header the same value as in
  // the request to `createArtifact`.
  // **Redirect artifacts**, will redirect the caller to URL when fetched
  // with a a 303 (See Other) response.  Clients will not apply any kind of
  // authentication to that URL.
  // **Link artifacts**, will be treated as if the caller requested the linked
  // artifact on the same task.  Links may be chained, but cycles are forbidden.
  // The caller must have scopes for the linked artifact, or a 403 response will
  // be returned.
  // **Error artifacts**, only consists of meta-data which the queue will
  // store for you. These artifacts are only meant to indicate that you the
  // worker or the task failed to generate a specific artifact, that you
  // would otherwise have uploaded. For example docker-worker will upload an
  // error artifact, if the file it was supposed to upload doesn't exists or
  // turns out to be a directory. Clients requesting an error artifact will
  // get a `424` (Failed Dependency) response. This is mainly designed to
  // ensure that dependent tasks can distinguish between artifacts that were
  // suppose to be generated and artifacts for which the name is misspelled.
  // **Artifact immutability**, generally speaking you cannot overwrite an
  // artifact when created. But if you repeat the request with the same
  // properties the request will succeed as the operation is idempotent.
  // This is useful if you need to refresh a signed URL while uploading.
  // Do not abuse this to overwrite artifacts created by another entity!
  // Such as worker-host overwriting artifact created by worker-code.
  // **Immutability Special Cases**:
  // * A `reference` artifact can replace an existing `reference` artifact`.
  // * A `link` artifact can replace an existing `reference` artifact`.
  // * Any artifact's `expires` can be extended.
  /* eslint-enable max-len */
  createArtifact(...args) {
    this.validate(this.createArtifact.entry, args);

    return this.request(this.createArtifact.entry, args);
  }
  /* eslint-disable max-len */
  // Get artifact by `<name>` from a specific run.
  // **Artifact Access**, in order to get an artifact you need the scope
  // `queue:get-artifact:<name>`, where `<name>` is the name of the artifact.
  // To allow access to fetch artifacts with a client like `curl` or a web
  // browser, without using Taskcluster credentials, include a scope in the
  // `anonymous` role.  The convention is to include
  // `queue:get-artifact:public/*`.
  // **Response**: the HTTP response to this method is a 303 redirect to the
  // URL from which the artifact can be downloaded.  The body of that response
  // contains the data described in the output schema, contianing the same URL.
  // Callers are encouraged to use whichever method of gathering the URL is
  // most convenient.  Standard HTTP clients will follow the redirect, while
  // API client libraries will return the JSON body.
  // In order to download an artifact the following must be done:
  // 1. Obtain queue url.  Building a signed url with a taskcluster client is
  // recommended
  // 1. Make a GET request which does not follow redirects
  // 1. In all cases, if specified, the
  // x-taskcluster-location-{content,transfer}-{sha256,length} values must be
  // validated to be equal to the Content-Length and Sha256 checksum of the
  // final artifact downloaded. as well as any intermediate redirects
  // 1. If this response is a 500-series error, retry using an exponential
  // backoff.  No more than 5 retries should be attempted
  // 1. If this response is a 400-series error, treat it appropriately for
  // your context.  This might be an error in responding to this request or
  // an Error storage type body.  This request should not be retried.
  // 1. If this response is a 200-series response, the response body is the artifact.
  // If the x-taskcluster-location-{content,transfer}-{sha256,length} and
  // x-taskcluster-location-content-encoding are specified, they should match
  // this response body
  // 1. If the response type is a 300-series redirect, the artifact will be at the
  // location specified by the `Location` header.  There are multiple artifact storage
  // types which use a 300-series redirect.
  // 1. For all redirects followed, the user must verify that the content-sha256, content-length,
  // transfer-sha256, transfer-length and content-encoding match every further request.  The final
  // artifact must also be validated against the values specified in the original queue response
  // 1. Caching of requests with an x-taskcluster-artifact-storage-type value of `reference`
  // must not occur
  // **Headers**
  // The following important headers are set on the response to this method:
  // * location: the url of the artifact if a redirect is to be performed
  // * x-taskcluster-artifact-storage-type: the storage type.  Example: s3
  /* eslint-enable max-len */
  getArtifact(...args) {
    this.validate(this.getArtifact.entry, args);

    return this.request(this.getArtifact.entry, args);
  }
  /* eslint-disable max-len */
  // Get artifact by `<name>` from the last run of a task.
  // **Artifact Access**, in order to get an artifact you need the scope
  // `queue:get-artifact:<name>`, where `<name>` is the name of the artifact.
  // To allow access to fetch artifacts with a client like `curl` or a web
  // browser, without using Taskcluster credentials, include a scope in the
  // `anonymous` role.  The convention is to include
  // `queue:get-artifact:public/*`.
  // **API Clients**, this method will redirect you to the artifact, if it is
  // stored externally. Either way, the response may not be JSON. So API
  // client users might want to generate a signed URL for this end-point and
  // use that URL with a normal HTTP client.
  // **Remark**, this end-point is slightly slower than
  // `queue.getArtifact`, so consider that if you already know the `runId` of
  // the latest run. Otherwise, just us the most convenient API end-point.
  /* eslint-enable max-len */
  getLatestArtifact(...args) {
    this.validate(this.getLatestArtifact.entry, args);

    return this.request(this.getLatestArtifact.entry, args);
  }
  /* eslint-disable max-len */
  // Returns a list of artifacts and associated meta-data for a given run.
  // As a task may have many artifacts paging may be necessary. If this
  // end-point returns a `continuationToken`, you should call the end-point
  // again with the `continuationToken` as the query-string option:
  // `continuationToken`.
  // By default this end-point will list up-to 1000 artifacts in a single page
  // you may limit this with the query-string parameter `limit`.
  /* eslint-enable max-len */
  listArtifacts(...args) {
    this.validate(this.listArtifacts.entry, args);

    return this.request(this.listArtifacts.entry, args);
  }
  /* eslint-disable max-len */
  // Returns a list of artifacts and associated meta-data for the latest run
  // from the given task.
  // As a task may have many artifacts paging may be necessary. If this
  // end-point returns a `continuationToken`, you should call the end-point
  // again with the `continuationToken` as the query-string option:
  // `continuationToken`.
  // By default this end-point will list up-to 1000 artifacts in a single page
  // you may limit this with the query-string parameter `limit`.
  /* eslint-enable max-len */
  listLatestArtifacts(...args) {
    this.validate(this.listLatestArtifacts.entry, args);

    return this.request(this.listLatestArtifacts.entry, args);
  }
  /* eslint-disable max-len */
  // Get all active provisioners.
  // The term "provisioner" is taken broadly to mean anything with a provisionerId.
  // This does not necessarily mean there is an associated service performing any
  // provisioning activity.
  // The response is paged. If this end-point returns a `continuationToken`, you
  // should call the end-point again with the `continuationToken` as a query-string
  // option. By default this end-point will list up to 1000 provisioners in a single
  // page. You may limit this with the query-string parameter `limit`.
  /* eslint-enable max-len */
  listProvisioners(...args) {
    this.validate(this.listProvisioners.entry, args);

    return this.request(this.listProvisioners.entry, args);
  }
  /* eslint-disable max-len */
  // Get an active provisioner.
  // The term "provisioner" is taken broadly to mean anything with a provisionerId.
  // This does not necessarily mean there is an associated service performing any
  // provisioning activity.
  /* eslint-enable max-len */
  getProvisioner(...args) {
    this.validate(this.getProvisioner.entry, args);

    return this.request(this.getProvisioner.entry, args);
  }
  /* eslint-disable max-len */
  // Declare a provisioner, supplying some details about it.
  // `declareProvisioner` allows updating one or more properties of a provisioner as long as the required scopes are
  // possessed. For example, a request to update the `my-provisioner`
  // provisioner with a body `{description: 'This provisioner is great'}` would require you to have the scope
  // `queue:declare-provisioner:my-provisioner#description`.
  // The term "provisioner" is taken broadly to mean anything with a provisionerId.
  // This does not necessarily mean there is an associated service performing any
  // provisioning activity.
  /* eslint-enable max-len */
  declareProvisioner(...args) {
    this.validate(this.declareProvisioner.entry, args);

    return this.request(this.declareProvisioner.entry, args);
  }
  /* eslint-disable max-len */
  // Get an approximate number of pending tasks for the given `taskQueueId`.
  // The underlying Azure Storage Queues only promises to give us an estimate.
  // Furthermore, we cache the result in memory for 20 seconds. So consumers
  // should be no means expect this to be an accurate number.
  // It is, however, a solid estimate of the number of pending tasks.
  /* eslint-enable max-len */
  pendingTasks(...args) {
    this.validate(this.pendingTasks.entry, args);

    return this.request(this.pendingTasks.entry, args);
  }
  /* eslint-disable max-len */
  // Get all active worker-types for the given provisioner.
  // The response is paged. If this end-point returns a `continuationToken`, you
  // should call the end-point again with the `continuationToken` as a query-string
  // option. By default this end-point will list up to 1000 worker-types in a single
  // page. You may limit this with the query-string parameter `limit`.
  /* eslint-enable max-len */
  listWorkerTypes(...args) {
    this.validate(this.listWorkerTypes.entry, args);

    return this.request(this.listWorkerTypes.entry, args);
  }
  /* eslint-disable max-len */
  // Get a worker-type from a provisioner.
  /* eslint-enable max-len */
  getWorkerType(...args) {
    this.validate(this.getWorkerType.entry, args);

    return this.request(this.getWorkerType.entry, args);
  }
  /* eslint-disable max-len */
  // Declare a workerType, supplying some details about it.
  // `declareWorkerType` allows updating one or more properties of a worker-type as long as the required scopes are
  // possessed. For example, a request to update the `highmem` worker-type within the `my-provisioner`
  // provisioner with a body `{description: 'This worker type is great'}` would require you to have the scope
  // `queue:declare-worker-type:my-provisioner/highmem#description`.
  /* eslint-enable max-len */
  declareWorkerType(...args) {
    this.validate(this.declareWorkerType.entry, args);

    return this.request(this.declareWorkerType.entry, args);
  }
  /* eslint-disable max-len */
  // Get all active task queues.
  // The response is paged. If this end-point returns a `continuationToken`, you
  // should call the end-point again with the `continuationToken` as a query-string
  // option. By default this end-point will list up to 1000 task queues in a single
  // page. You may limit this with the query-string parameter `limit`.
  /* eslint-enable max-len */
  listTaskQueues(...args) {
    this.validate(this.listTaskQueues.entry, args);

    return this.request(this.listTaskQueues.entry, args);
  }
  /* eslint-disable max-len */
  // Get a task queue.
  /* eslint-enable max-len */
  getTaskQueue(...args) {
    this.validate(this.getTaskQueue.entry, args);

    return this.request(this.getTaskQueue.entry, args);
  }
  /* eslint-disable max-len */
  // Get a list of all active workers of a workerType.
  // `listWorkers` allows a response to be filtered by quarantined and non quarantined workers.
  // To filter the query, you should call the end-point with `quarantined` as a query-string option with a
  // true or false value.
  // The response is paged. If this end-point returns a `continuationToken`, you
  // should call the end-point again with the `continuationToken` as a query-string
  // option. By default this end-point will list up to 1000 workers in a single
  // page. You may limit this with the query-string parameter `limit`.
  /* eslint-enable max-len */
  listWorkers(...args) {
    this.validate(this.listWorkers.entry, args);

    return this.request(this.listWorkers.entry, args);
  }
  /* eslint-disable max-len */
  // Get a worker from a worker-type.
  /* eslint-enable max-len */
  getWorker(...args) {
    this.validate(this.getWorker.entry, args);

    return this.request(this.getWorker.entry, args);
  }
  /* eslint-disable max-len */
  // Quarantine a worker
  /* eslint-enable max-len */
  quarantineWorker(...args) {
    this.validate(this.quarantineWorker.entry, args);

    return this.request(this.quarantineWorker.entry, args);
  }
  /* eslint-disable max-len */
  // Declare a worker, supplying some details about it.
  // `declareWorker` allows updating one or more properties of a worker as long as the required scopes are
  // possessed.
  /* eslint-enable max-len */
  declareWorker(...args) {
    this.validate(this.declareWorker.entry, args);

    return this.request(this.declareWorker.entry, args);
  }
}
