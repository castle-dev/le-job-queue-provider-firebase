var Worker = require('firebase-queue');
/**
 * A bridge between le-job-queue-service and Firebase
 * @class JobQueueProvider
 * @param {string} ref the firebase root reference
 * @param {string} type the type of queue you want to create, supported types are 'default', 'session', and 'fast', leaving the field undefined is the same as 'default'
 * @returns {provider}
 */
var JobQueueProvider = function (ref, type) {
  if (!ref) { throw new Error('Firebase reference required'); }
  if (type !== 'session' && type !== 'fast' && type !== 'default' && type !== undefined) {
    throw new Error('Invalid value for the type param, value: ' + type);
  }
  var _ref = ref;
  var worker;
  /**
   * Creates a worker to process jobs
   * @function createWorker
   * @memberof JobQueueProvider
   * @instance
   * @param {Function} processJob function to call when processing a job. It is sent two params, the job (type and data) as well as a function that should be called when the consumer is done processing the job
   * @returns {promise}
   */
  this.createWorker = function (processJob) {
    if (!processJob) { throw new Error('Process job function required'); }
    if (worker) { throw new Error('Worker was already created'); }
    var options = { numWorkers: 1, specId: 'noTimeout' };
    var queueLocation;
    if(type === 'fast') {
      queueLocation = 'fastQueue';
    } else if (type === 'session'){
      queueLocation = 'sessionQueue';
    } else {
      queueLocation = 'queue'
    }
    worker = new Worker(_ref.child('_' + queueLocation), options, function (data, progress, resolve, reject) {
      processJob(data, function () {
        _ref.child(queueLocation).child('completedTasks').push(data, function (err) {
          if (err) { throw err; }
          else { resolve(); }
        });
      });
    });
  }
  /**
   * Prevents the worker from picking up new jobs and resolves once current jobs are complete
   * @function shutdown
   * @memberof JobQueueProvider
   * @instance
   * @returns {promise}
   */
  this.shutdown = function () {
    if (!worker) { throw new Error('Cannot shutdown before creating a worker'); }
    return worker.shutdown();
  }
}

module.exports = JobQueueProvider;
