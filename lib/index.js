'use strict';

var cookie = require('easy-cookie');

function createKibe(d, cookie) {
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
      var script = d.createElement('script');
      script.id = id;
      script.src = url;
      d.write(script.outerHTML);
    };
  }

  function createStyleInjector(id, url) {
    return function() {
      if (d.getElementById(id)) {
        return;
      }
      var link = d.createElement('link');
      link.id = id;
      link.href = url;
      link.rel = 'stylesheet';
      link.type = 'text/css';
      d.write(link.outerHTML);
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
