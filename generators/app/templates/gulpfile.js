var wrench = require('wrench');
var gulp = require('gulp');
var del = require('del');
var jsdoc = require('gulp-jsdoc3');

var pkg = require('./package');

var options = {
  name: pkg.name,
  version: pkg.version,
  main_js: 'index.js',
  main_less: 'index.less',
  main_css: 'index.css',
  main_html: 'index.html',
  doc_config: require('./docConfig.json'),
  pkg: pkg
};

var gulpMap = {};

wrench.readdirSyncRecursive('./gulp').filter(function(file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
  gulpMap[file.split('.')[0]] = require('./gulp/' + file);
});

gulp.task('default', function() {
  del(['build'], function() {
    gulpMap['webpack'](options, 'index');
    gulpMap['webpack'](options, 'mIndex');
  });
});

// 启动server
gulp.task('doc', function() {
  gulp.src(['README.md','lib/index.js'], {read: false})
    .pipe(jsdoc(options.doc_config));
});

// 启动server
gulp.task('server', function() {
  gulpMap['server'](options);
  gulpMap['watch'](options);
});

// 启动test
gulpMap['test']();
