'use strict';

var cookie = require('easy-cookie');

function createKibe(d, cookie) {
  var fjs = d.getElementsByTagName('script')[0];
  var cookieName = '_kibe';
  var modeName;

  function addLinks(links, key) {
    if (typeof links === 'function') {
      addLinks([links], key);
      return;
    }

    for (var i = 0, len = links.length; i < len; i++) {
      links[i](key);
    }
  }

  function createScriptInjector(id, url) {
    return function() {
      if (d.getElementById(id)) {
        return;
      }
      var js = d.createElement('script');
      js.id = id;
      js.src = url;
      fjs.parentNode.insertBefore(js, fjs);
    };
  }

  function createStyleInjector(id, url) {
    return function() {
      if (d.getElementById(id)) {
        return;
      }
      var css = d.createElement('link');
      css.id = id;
      css.href = url;
      css.rel = 'stylesheet';
      css.type = 'text/css';
      fjs.parentNode.insertBefore(css, fjs);
    };
  }

  function kibe(opts) {
    modeName = cookie.get(cookieName) || 'def';

    if (arguments.length === 0) {
      return modeName;
    }
    if (typeof opts === 'string') {
      cookie.set(cookieName, opts);
      d.location.reload();
      return;
    }

    opts = opts || {};

    if (opts[modeName]) {
      addLinks(opts[modeName], modeName);
    }
  }

  kibe.js = createScriptInjector;
  kibe.css = createStyleInjector;

  return kibe;
}

var kibe = createKibe(document, cookie);
window.kibe = kibe;

module.exports = kibe;
