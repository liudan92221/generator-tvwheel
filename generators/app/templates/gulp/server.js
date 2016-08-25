"use strict";

var gulp = require('gulp');
var gutil = require('gulp-util');
var webserver = require('gulp-webserver');

module.exports = function(options) {
  var name = options.name.replace('@', '');

  gulp.src('./')
    .pipe(webserver({
      path: '/' + name + '/' + options.version + '/',
      host: '0.0.0.0',
      port: 80,
      livereload: true,
      directoryListing: {
        enable: true,
        path: './'
      },
      middleware: function(req, res, next) {
        gutil.log('Request received: ' + req.url);
        next();
      }
    }));
  gutil.log(gutil.colors.green('http://localhost/' + name + '/' + options.version + '/'));
};
