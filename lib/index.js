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
    /** Removes a cookie by name.
     */
    remove: function (key) {
      this.set(key, '', -1);
    },

    /** Sets the value of a cookie.
     * @param {string} value - The value of the cookie.
     * @param {number} [expires] - The lifetime of the cookie in days.
     */
    set: function (key, value, expires) {
      var lifetimeDays = expires ? expires : 7;
      expires = new Date();
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

  var foso = (function (d) {
    var cookieName = '_foso';
    var isSecure = d.location.protocol === 'https:';

    function testProjName() {
      return cookie.get(cookieName);
    }

    function injectScript(url, scriptId) {
      if (d.getElementById(scriptId)) {
        return;
      }
      var script = document.createElement('script');
      script.id = scriptId;
      script.src = url;      
      document.write(script.outerHTML);
    }

    var result = function (opts) {
      opts = opts || {};
      var testProj = testProjName();
      if (testProj) {
        var liveReloadUrl = 'https://localhost:2769/livereload.js';
        injectScript(liveReloadUrl, 'foso-livereload');
      }

      for (var key in opts) {
        var isTest = key === testProj;
        if (!isTest && !opts[key].normal) {
          continue;
        }

        var activeOpts = isTest ? opts[key].test : opts[key].normal;
        activeOpts = activeOpts || {};

        var scriptName = activeOpts.main || 'index';
        var host = activeOpts.host;
        var secureHost = activeOpts.secureHost || host;

        if (isTest) {
          host = host || 'localhost:1769/';
          secureHost = secureHost || 'localhost:1770/';
        }

        var url = d.location.protocol + '//' +
          (isSecure ? secureHost : host) +
          scriptName + '.js';

        injectScript(url, 'foso-trojan-' + key);
      }
    };
    result.test = function (proj) {
      if (arguments.length === 0) {
        return testProjName();
      }
      
      cookie.set(cookieName, proj);        
      d.location.reload();
    };
    result.testOff = function () {
      cookie.remove(cookieName);
      d.location.reload();
    };
    
    return result;
  })(document);

  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = foso;
  } else {
    window.foso = foso;
  }
})();
