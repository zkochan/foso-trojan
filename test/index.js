'use strict';

var sinon = require('sinon');
var chai = require('chai');
var sinonChai = require('sinon-chai');
var expect = chai.expect;
chai.use(sinonChai);
var kibe = require('../lib');
var cookie = require('easy-cookie');
var COOKIE_KEY = '_kibe';

describe('Kibe', function() {
  beforeEach(function() {
    cookie.remove(COOKIE_KEY);
  });

  it('Adds link if not already in the DOM', function() {
    kibe({
      def: kibe.js('foo', 'http://domain.com/index.js')
    });

    var el = document.getElementById('foo');
    expect(el.tagName).to.eq('SCRIPT');
    expect(el.src).to.eq('http://domain.com/index.js');
    el.parentNode.removeChild(el);
  });

  it('executes correct mode scripts if mode is present in the cookies', function() {
    cookie.set(COOKIE_KEY, 'test');
    var spy = sinon.spy();
    kibe({
      test: [spy]
    });
    expect(spy).to.have.been.calledOnce;
    expect(spy).to.have.been.calledWithExactly('test');
  });

  it('executes default mode scripts if mode not present in the cookies', function() {
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
});
