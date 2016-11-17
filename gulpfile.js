'use strict';

// general
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var nodemon = require('gulp-nodemon');

var commonDir = 'public';

var config = {
  scssSrcDir: commonDir + '/assets/scss',
  // jsSrcDir: sourceDir + '/js',
  // imgSrcDir: sourceDir + '/imgs',
  // fontsSrcDir: sourceDir + '/fonts',
  autoprefixer: {
    browsers: ['> 1%', 'last 2 versions'],
    cascade: true,
    remove: true
  }
};


gulp.task('serve', ['build', 'browser-sync']);

gulp.task('browser-sync', ['nodemon'], function() {
  browserSync.init(null, {
    proxy: "http://localhost:5000",
        files: ["public/**/*.*"],
        browser: "google chrome",
        port: 7000,
  });

  gulp.watch(config.scssSrcDir + '/**/*.*', ['styles']);
  gulp.watch('views/**/*.html', ['styles']);
});

gulp.task('nodemon', function (cb) {
  var started = false;

  return nodemon({
    script: 'index.js'
  }).on('start', function () {
    // to avoid nodemon being started multiple times
    if (!started) {
      cb();
      started = true;
    }
  })
  .on('restart', function () {
    console.log('restarted!')
  });
});


gulp.task('build', ['styles']);


// compile sass
gulp.task('styles', function () {
  var files = config.scssSrcDir + '/**/*.*';

  gulp.src(files)
    .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(autoprefixer(config.autoprefixer))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest(commonDir + '/assets/css'))

    .pipe(browserSync.stream());
});

// gulp.task('scripts', function () {
//   var files = config.jsSrcDir + '/**/*.js';

//   gulp.src(files)
//     .pipe(sourcemaps.init())
//       .pipe(uglify())
//       .pipe(concat('main.js'))
//     .pipe(sourcemaps.write('maps'))
//     .pipe(gulp.dest(destDir + '/js'))
//     .pipe(browserSync.stream());
// });


