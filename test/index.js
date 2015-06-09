'use strict';

var FosoTrojan = require('../lib').Foso;
var _ = require('lodash');
var cookieValue;
var cookie = {
  get: function() {
    return cookieValue;
  },
  set: _.noop,
  remove: _.noop
}

describe('Foso Trojan', function() {
  describe('Normal mode with one project', function() {
    it('Adds non-secure link', function(done) {
      var doc = {
        write: function(html) {
          expect(html).toBe('<script id="foso-trojan-foo" src="http://domain.com/index.js"></script>');
          done();
        },
        getElementById: _.noop,
        createElement: _.bind(window.document.createElement, window.document),
        location: {
          protocol: 'http:'
        }
      };
      var foso = new FosoTrojan(doc, cookie);
      foso({
        foo: {
          normal: {
            host: 'domain.com'
          }
        }
      });
    });

    it('Adds secure link when secureHost not specified', function(done) {
      var doc = {
        write: function(html) {
          expect(html).toBe('<script id="foso-trojan-foo" src="https://domain.com/index.js"></script>');
          done();
        },
        getElementById: _.noop,
        createElement: _.bind(window.document.createElement, window.document),
        location: {
          protocol: 'https:'
        }
      };
      var foso = new FosoTrojan(doc, cookie);
      foso({
        foo: {
          normal: {
            host: 'domain.com'
          }
        }
      });
    });

    it('Adds secure link when secureHost specified', function(done) {
      var doc = {
        write: function(html) {
          expect(html).toBe('<script id="foso-trojan-foo" src="https://secure.domain.com/index.js"></script>');
          done();
        },
        getElementById: _.noop,
        createElement: _.bind(window.document.createElement, window.document),
        location: {
          protocol: 'https:'
        }
      };
      var foso = new FosoTrojan(doc, cookie);
      foso({
        foo: {
          normal: {
            host: 'domain.com',
            secureHost: 'secure.domain.com'
          }
        }
      });
    });

    it('Adds link when main js specified', function(done) {
      var doc = {
        write: function(html) {
          expect(html).toBe('<script id="foso-trojan-foo" src="http://domain.com/bar.js"></script>');
          done();
        },
        getElementById: _.noop,
        createElement: _.bind(window.document.createElement, window.document),
        location: {
          protocol: 'http:'
        }
      };
      var foso = new FosoTrojan(doc, cookie);
      foso({
        foo: {
          normal: {
            main: '/bar.js',
            host: 'domain.com'
          }
        }
      });
    });
  });
});
