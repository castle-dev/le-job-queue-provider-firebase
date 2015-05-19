le-job-queue-provider-firebase
=========

**Connect le-job-queue-service to Firebase**

## Installation

  `npm install le-job-queue-provider-firebase`

## Usage

```
  var JobQueueProvider = require('le-job-queue-provider-firebase');
  var firebaseUrl = /* your firebase url */
  var provider = new JobQueueProvider(firebaseUrl);
```

## Tests

* `npm test` to run unit tests once
* `gulp tdd` to run unit and e2e tests when tests change
* `gulp coverage` to run unit tests and create a code coverage report

## Contributing

Please follow the project's [conventions](https://github.com/castle-dev/le-job-queue-provider-firebase/blob/develop/CONTRIBUTING.md) or your changes will not be accepted

## Release History

* 0.1.0 Initial release
