var Firebase = require('firebase');
var Worker = require('firebase-queue');

var JobQueueProvider = function (url) {
  if (!url) { throw new Error('Firebase url required'); }
  var _ref = new Firebase(url);

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
