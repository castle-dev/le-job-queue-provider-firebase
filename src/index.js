var Firebase = require('firebase');
var Worker = require('firebase-queue');
/**
 * A bridge between le-job-queue-service and Firebase
 * @class JobQueueProvider
 * @param {string} url the firebase url
 * @returns {provider}
 */
var JobQueueProvider = function (url) {
  if (!url) { throw new Error('Firebase url required'); }
  var _ref = new Firebase(url);
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
    var options = { numWorkers: 3 };
    var worker = new Worker(_ref.child('_queue'), options, function (data, progress, resolve, reject) {
      processJob(data, function () {
        _ref.child('queue').child('completedTasks').push(data, function (err) {
          if (err) { throw err; }
          else { resolve(); }
        });
      });
    });
  }
}

module.exports = JobQueueProvider;
