"use strict";

var gulp = require('gulp');
// var gutil = require('gulp-util');
var webpack = require('webpack-stream');
var wb = require('webpack');
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
    entry[file] = path.join(__dirname, '../'+file+'.js');
  }
  // webpack配置
  var cfg = {
    cache: true,
    entry: entry,
    output: {
      path: path.join(__dirname, '../build'),
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
          // exclude: /(node_modules|bower_components)/,
          test: /\.js$/,
          loader: 'babel',
          query: {
            presets: ['es2015', 'stage-0']
          }
        },
        {
          test: /\.less$/,
          loader: 'style!css!less'
        }
      ]
    },
    devtool: 'inline-source-map',
    plugins: [new wb.optimize.DedupePlugin()]
  };
  gulp.src(entry[file])
    .pipe(webpack(cfg))
    .pipe(gulp.dest('build'))
    .pipe(uglify({
      output:{
        ascii_only:true
      }
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(banner(comment, {
      pkg: options.pkg
    }))
    .pipe(gulp.dest('build'))

//   webpack(cfg, function(err, stats) {
//     if (err) throw new gutil.PluginError('webpack:build', err);
//     gutil.log('[webpack:build]', stats.toString({
//       colors: true
//     }));
//
//     // 压缩webpack生成的js文件
//     fs.exists(path.join(__dirname, '../build/' + file +'.js'), function(exists) {
//       if (!exists) {return;}
//       gulp.src('build/' + file +'.js')
//         .pipe(uglify({
//           output: {
//             ascii_only: true
//           }
//         }))
//         .pipe(rename({
//           suffix: '.min'
//         }))
//         .pipe(banner(comment, {
//           pkg: options.pkg
//         }))
//         .pipe(footer('//# sourceMappingURL='+file+'.js.map'))
//         .pipe(gulp.dest('build'));
//       gutil.log(gutil.colors.green('Minify JS: build/'+ file +'.min.js'));
//     });
//   });
};
