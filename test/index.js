'use strict';

var sinon = require('sinon');
var chai = require('chai');
var sinonChai = require('sinon-chai');
var expect = chai.expect;
chai.use(sinonChai);
var createKibe = require('../lib').createKibe;
var _ = require('lodash');
var cookieValue;
var cookie = {
  get: function() {
    return cookieValue;
  },
  set: _.noop
};

describe('Kibe', function() {
  beforeEach(function() {
    cookieValue = null;
  });

  it('Adds link if not already in the DOM', function() {
    var spy = sinon.spy();
    var doc = {
      write: spy,
      getElementById: _.noop,
      createElement: _.bind(window.document.createElement, window.document)
    };
    var kibe = createKibe(doc, cookie);
    kibe({
      def: kibe.js('foo', 'http://domain.com/index.js')
    });
    expect(spy).to.have.been.calledWithExactly('<script id="foo" src="http://domain.com/index.js"></script>');
  });

  it('executes correct mode scripts if mode is present in the cookies', function() {
    cookieValue = 'test';
    var spy = sinon.spy();
    var doc = {
      write: _.noop,
      getElementById: _.noop,
      createElement: _.bind(window.document.createElement, window.document)
    };
    var kibe = createKibe(doc, cookie);
    kibe({
      test: [spy]
    });
    expect(spy).to.have.been.calledWithExactly('test');
  });

  it('executes default mode scripts if mode not present in the cookies', function() {
    cookieValue = null;
    var spy = sinon.spy();
    var doc = {
      write: _.noop,
      getElementById: _.noop,
      createElement: _.bind(window.document.createElement, window.document)
    };
    var kibe = createKibe(doc, cookie);
    kibe({
      def: [spy]
    });
    expect(spy).to.have.been.calledWithExactly('def');
  });

  it('Sets mode and reloads page', function() {
    var setSpy = sinon.spy();
    var reloadSpy = sinon.spy();
    var doc = {
      location: {
        reload: reloadSpy
      },
      write: _.noop,
      getElementById: _.noop,
      createElement: _.bind(window.document.createElement, window.document)
    };
    var kibe = createKibe(doc, _.merge(cookie, {
      set: setSpy
    }));
    kibe('foo');
    expect(setSpy).to.have.been.calledWithExactly('_kibe', 'foo');
    expect(reloadSpy).to.have.been.calledOnce;
  });
});
