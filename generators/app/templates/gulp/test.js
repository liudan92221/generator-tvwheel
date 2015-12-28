"use strict";

var gulp = require('gulp');
var mochaPhantomJS = require('gulp-mocha-phantomjs');

module.exports = function(options, page) {
  gulp.task('test', function () {
    return gulp
      .src('test/**/**.html')
      .pipe(mochaPhantomJS({
        reporter: 'list',
        mocha: {
          //grep: 'pattern'
        },
        phantomjs: {

        }
      }));
  });
};
