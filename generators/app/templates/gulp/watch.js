"use strict";

var gulp = require('gulp');
var gutil = require('gulp-util');

var gulpMap = {
  'webpack': require('./webpack')
};
// 从sudo降权，避免build后的文件为root权限
function unRoot() {

  if (process.setgid && process.setuid) {
    var env = process.env,
      uid = parseInt(env['SUDO_UID'] || process.getuid(), 10),
      gid = parseInt(env['SUDO_GID'] || process.getgid(), 10);
    process.setgid(gid);
    process.setuid(uid);
  }
}
module.exports = function(options) {
  var lib = gulp.watch(['lib/**'], function() {
    unRoot();
    gulpMap['webpack'](options, 'index');
    gulpMap['webpack'](options, 'mIndex');

  });

  lib.on('change', function(event) {
    gutil.log(gutil.colors.yellow('File ' + event.path + ' was ' + event.type));
  });

  var index = gulp.watch(['index.js'], function() {
    unRoot();
    gulpMap['webpack'](options, 'index');
  });
  index.on('change', function(event) {
    gutil.log(gutil.colors.yellow('File ' + event.path + ' was ' + event.type));
  });
  var mIndex = gulp.watch(['mIndex.js'], function() {
    unRoot();
    gulpMap['webpack'](options, 'mIndex');
  });

  mIndex.on('change', function(event) {
    gutil.log(gutil.colors.yellow('File ' + event.path + ' was ' + event.type));
  });
};
