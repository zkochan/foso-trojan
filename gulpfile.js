'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var karma = require('gulp-karma');

gulp.task('default', ['compress']);

gulp.task('compress', function() {
  return gulp.src('lib/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('build'));
});

gulp.task('test', function () {
  gulp.src('./test/**/*')
    .pipe(karma({
      configFile: './karma.conf.js',
      action: 'run'
    }));
});
