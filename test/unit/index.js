var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var chaiAsPromised = require("chai-as-promised");
var expect = chai.expect;
chai.use(sinonChai);
chai.use(chaiAsPromised);

var JobQueueProvider = require('../../src/index.js');
var mockRef = {};

describe('unit tests::', function () {
  var provider;
  it('should respect logic', function () {
    expect(true).to.be.true;
    expect(true).not.to.be.false;
  });
  it('should be constructable', function () {
    expect(function () {
      provider = new JobQueueProvider(mockRef);
    }).not.to.throw();
  });
  it('should require a firebase ref', function () {
    expect(function () {
      provider = new JobQueueProvider();
    }).to.throw('Firebase reference required');
  });
});
