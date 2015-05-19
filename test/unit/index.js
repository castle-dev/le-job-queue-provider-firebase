var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var chaiAsPromised = require("chai-as-promised");
var expect = chai.expect;
chai.use(sinonChai);
chai.use(chaiAsPromised);

var JobQueueProvider = require('../../src/index.js');
var firebaseUrl = 'https://test.firebaseio.com/';

describe('unit tests::', function () {
  var provider;
  it('should respect logic', function () {
    expect(true).to.be.true;
    expect(true).not.to.be.false;
  });
  xit('should be constructable', function () {
    expect(function () {
      provider = new JobQueueProvider(firebaseUrl);
    }).not.to.throw();
  }); // skipping this spec because the firebase connection prevents the gulp task from completing
  it('should require a firebase url', function () {
    expect(function () {
      provider = new JobQueueProvider();
    }).to.throw('Firebase url required');
  });
});
