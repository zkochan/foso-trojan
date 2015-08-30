'use strict';

var kibe = require('../lib');

kibe({
  foo: [
    kibe.js('foo', '/foo.js'),
    kibe.css('foo-css', '/foo.css')
  ]
});
