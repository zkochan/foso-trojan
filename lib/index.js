'use strict';

var cookie = require('easy-cookie');

function createKibe(d, cookie) {
  var cookieName = '_kibe';
  var modeName = cookie.get(cookieName) || 'default';

  function injectScript(url, scriptId) {
    if (d.getElementById(scriptId)) {
      return;
    }
    var script = d.createElement('script');
    script.id = scriptId;
    script.src = url;
    d.write(script.outerHTML);
  }

  return function(opts) {
    if (arguments.length === 0) {
      return modeName;
    }
    if (typeof opts === 'string') {
      cookie.set(cookieName, opts);
      d.location.reload();
      return;
    }

    opts = opts || {};

    for (var key in opts) {
      var urlGetter = opts[key];

      if (typeof urlGetter !== 'function') {
        continue;
      }

      var url = urlGetter(modeName);
      if (url) {
        injectScript(url, 'kibe-' + key);
      }
    }
  };
}

var kibe = createKibe(document, cookie);
window.kibe = kibe;

module.exports = kibe;
module.exports.createKibe = createKibe;
