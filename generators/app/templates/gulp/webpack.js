"use strict";

var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var path = require('path');
var banner = require('gulp-banner');
var footer = require('gulp-footer');
var fs = require('fs');

var comment = '/*\n' +
  ' * <%= pkg.name %> <%= pkg.version %> <'+(new Date())+'>\n' +
  ' * <%= pkg.description %>\n' +
  ' * <%= pkg.author.name %> - <%= pkg.homepage %>\n' +
  ' *\n' +
  ' * Copyright 2016, <%= pkg.company %>\n' +
  ' * Released under the <%= pkg.license %> license.\n' +
  '*/\n\n';

module.exports = function(options, file) {
  var entry = {};
  var exists = fs.existsSync(path.join(__dirname, '../'+file+'.js'));
  if (exists) {
    entry[file] = './'+file+'.js';
  }
  // webpack配置
  var cfg = {
    cache: true,
    entry: entry,
    output: {
      path: './build',
      filename: '[name].js',
      chunkFilename: '[chunkhash].js'
    },
    module: {
      loaders: [
        {
          test: /\.css$/,
          loader: 'style!css'
        },
        {
          test: /\.js$/,
          loader: 'babel'
        },
        {
          test: /\.less$/,
          loader: 'style!css!less'
        }
      ]
    },
    devtool: 'source-map',
    plugins: [new webpack.optimize.DedupePlugin()]
  };

  webpack(cfg, function(err, stats) {
    if (err) throw new gutil.PluginError('webpack:build', err);
    gutil.log('[webpack:build]', stats.toString({
      colors: true
    }));

    // 压缩webpack生成的js文件
    fs.exists(path.join(__dirname, '../build/' + file +'.js'), function(exists) {
      if (!exists) {return;}
      gulp.src('build/' + file +'.js')
        .pipe(uglify({
          output: {
            ascii_only: true
          }
        }))
        .pipe(rename({
          suffix: '.min'
        }))
        .pipe(banner(comment, {
          pkg: options.pkg
        }))
        .pipe(footer('//# sourceMappingURL='+file+'.js.map'))
        .pipe(gulp.dest('build'));
      gutil.log(gutil.colors.green('Minify JS: build/'+ file +'.min.js'));
    });
  });
};
