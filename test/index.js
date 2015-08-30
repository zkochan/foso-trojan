'use strict';

var sinon = require('sinon');
var chai = require('chai');
var sinonChai = require('sinon-chai');
var expect = chai.expect;
chai.use(sinonChai);
var kibe = require('../lib');
var cookie = require('easy-cookie');
var COOKIE_KEY = '_kibe';

describe('kibe', function() {
  beforeEach(function() {
    cookie.remove(COOKIE_KEY);
  });

  it('adds link if not already in the DOM', function() {
    kibe({
      def: kibe.js('foo', 'http://domain.com/index.js')
    });

    var el = document.getElementById('foo');
    expect(el.tagName).to.eq('SCRIPT');
    expect(el.src).to.eq('http://domain.com/index.js');
    el.parentNode.removeChild(el);
  });

  it('uses mode specified in the cookies', function() {
    cookie.set(COOKIE_KEY, 'test');
    var spy = sinon.spy();
    kibe({
      test: [spy]
    });
    expect(spy).to.have.been.calledOnce;
    expect(spy).to.have.been.calledWithExactly('test');
  });

  it('uses default mode if no mode is specified', function() {
    var spy = sinon.spy();
    kibe({
      def: [spy]
    });
    expect(spy).to.have.been.calledWithExactly('def');
  });

  it('sets mode and reloads page', function() {
    var reloadSpy = sinon.spy();
    location.reload = reloadSpy;
    kibe('foo');
    expect(cookie.get(COOKIE_KEY)).to.eq('foo');
    expect(reloadSpy).to.have.been.calledOnce;
  });

  describe('js', function() {
    it('injects script tag to the page if not already present', function() {
      var src = 'http://example.com/index.js';
      kibe.js('qar', src)();
      var el = document.getElementById('qar');
      expect(el.tagName).to.eq('SCRIPT');
      expect(el.src).to.eq(src);
      el.parentNode.removeChild(el);
    });
  });

  describe('css', function() {
    it('injects style tag to the page if not already present', function() {
      var src = 'http://example.com/index.css';
      kibe.css('bar', src)();
      var el = document.getElementById('bar');
      expect(el.tagName).to.eq('LINK');
      expect(el.href).to.eq(src);
      expect(el.rel).to.eq('stylesheet');
      expect(el.type).to.eq('text/css');
      el.parentNode.removeChild(el);
    });
  });
});
