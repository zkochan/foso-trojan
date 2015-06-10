'use strict';

var Kibe = require('../lib').Kibe;
var _ = require('lodash');
var cookieValue;
var cookie = {
  get: function() {
    return cookieValue;
  },
  set: _.noop
}

describe('Kibe', function() {
  beforeEach(function() {
    cookieValue = null;
  });

  it('Adds link if not already in the DOM', function(done) {
    var doc = {
      write: function(html) {
        expect(html).toBe('<script id="kibe-foo" src="http://domain.com/index.js"></script>');
        done();
      },
      getElementById: _.noop,
      createElement: _.bind(window.document.createElement, window.document)
    };
    var kibe = new Kibe(doc, cookie);
    kibe({
      foo: function(mode) {
        return 'http://domain.com/index.js';
      }
    });
  });

  it('Returns correct mode name if is present in the cookies', function(done) {
    cookieValue = 'test';
    var doc = {
      write: _.noop,
      getElementById: _.noop,
      createElement: _.bind(window.document.createElement, window.document)
    };
    var kibe = new Kibe(doc, cookie);
    kibe({
      foo: function(mode) {
        expect(mode).toBe('test');
        done();
      }
    });
  });

  it('Returns default mode name if not present in the cookies', function(done) {
    cookieValue = null;
    var doc = {
      write: _.noop,
      getElementById: _.noop,
      createElement: _.bind(window.document.createElement, window.document)
    };
    var kibe = new Kibe(doc, cookie);
    kibe({
      foo: function(mode) {
        expect(mode).toBe('default');
        done();
      }
    });
  });
});
