"use strict";

var gulp = require('gulp');
var gutil = require('gulp-util');
var webserver = require('gulp-webserver');

module.exports = function (options) {
  var name = options.name.replace('@', '');

  var port = 80
  if (process && process.argv && process.argv[3]) {
    var sudo = process.argv[0]

    port = parseInt(process.argv[3].slice(1), 10)
    if (sudo === 'sudo') {
      port = parseInt(process.argv[4].slice(1), 10)
    }
    if (isNaN(port)) {
      port = 80
    }
  }

  gulp.src('./')
    .pipe(webserver({
      path: '/' + name + '/' + options.version + '/',
      host: '0.0.0.0',
      port: port || 80,
      livereload: true,
      directoryListing: {
        enable: true,
        path: './'
      },
      middleware: function (req, res, next) {
        gutil.log('Request received: ' + req.url);
        next();
      }
    }));
  if (port !== 80) {
    gutil.log(gutil.colors.green('http://localhost:' + port + '/' + name + '/' + options.version + '/'));
  } else {
    gutil.log(gutil.colors.green('http://localhost/' + name + '/' + options.version + '/'));
  }
};
