'use strict';

var gulp = require('gulp');
var foso = require('foso');
var js = require('fosify-js');
var test = require('fosify-test');

gulp.task('default', ['build']);

gulp.task('build', function() {
  foso
    .please({
      src: './lib',
      minify: true
    })
    .fosify(js)
    .now();
});

gulp.task('test', function() {
  foso
    .please()
    .fosify(test)
    .now();
});
