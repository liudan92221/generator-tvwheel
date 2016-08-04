var gulp = require('gulp');
var jsdoc = require('gulp-jsdoc3');

module.exports = function(options) {
  gulp.src(['README.md', './lib/*.js', './index.js', './mIndex.js'], {read: false})
    .pipe(jsdoc(options.doc_config));
}
