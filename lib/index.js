(function () {
  'use strict';

  /* Source of the domain retriever http://bit.ly/1yvoNw2 */
  var baseDomain = (function () {
    var i = 0,
      domain = document.domain,
      p = domain.split('.'),
      s = '_gd' + (new Date()).getTime();
    while (i < (p.length - 1) && document.cookie.indexOf(s + '=' + s) === -1) {
      domain = p.slice(-1 - (++i)).join('.');
      document.cookie = s + '=' + s + ';domain=' + domain + ';';
    }
    document.cookie = s + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=' +
      domain + ';';
    return domain;
  })();

  var cookie = {
    /** Sets the value of a cookie.
     * @param {string} value - The value of the cookie.
     * @param {number} [expires] - The lifetime of the cookie in days.
     */
    set: function (key, value) {
      var lifetimeDays = 7;
      var expires = new Date();
      expires.setTime(+expires + lifetimeDays * 864e+5);

      document.cookie = [
        encodeURIComponent(key), '=', encodeURIComponent(String(value)),
        // use expires attribute, max-age is not supported by IE
        '; expires=', expires.toUTCString(),
        '; path=/',
        baseDomain === 'localhost' ? '' : '; domain=' + baseDomain
      ].join('');
    },

    /** Returns the value of a cookie under the specified key.
     * @returns {string} - The value of the cookie.
     */
    get: function (key) {
      if (!key) {
        return null;
      }

      var cookies = document.cookie ? document.cookie.split('; ') : [];

      for (var i = cookies.length; i--;) {
        var parts = cookies[i].split('='),
          name = decodeURIComponent(parts.shift()),
          cookie = parts.join('=');

        if (key && key === name) {
          return decodeURIComponent(cookie);
        }
      }

      return null;
    }
  };

  function Kibe(d, cookie) {
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

    return function (opts) {
      if (arguments.length === 0) {
        return modeName;
      }
      if (typeof opts === 'string') {
        cookie.set(cookieName, name);
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

  var kibe = new Kibe(document, cookie);

  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = kibe;
    module.exports.Kibe = Kibe;
  } else {
    window.kibe = kibe;
  }
})();
