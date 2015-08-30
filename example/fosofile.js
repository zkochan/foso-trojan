'use strict';

var foso = require('foso');
var js = require('fosify-js');
var less = require('fosify-less');
var html = require('fosify-html');

foso
  .please({
    serve: true,
    watch: true
  })
  .fosify(js)
  .fosify(less)
  .fosify(html)
  .now();
