"use strict";

var gulp = require('gulp');
var gutil = require('gulp-util');

module.exports = function() {
  gulp.src('demo/**')
    .pipe(gulp.dest('build/demo/'));
  gutil.log(gutil.colors.green('Copy demo: build/demo'));
};
