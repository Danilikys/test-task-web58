'use strict';

var gulp = require('gulp'),
  watch = require('gulp-watch'),
  prefixer = require('gulp-autoprefixer'),
  uglify = require('gulp-uglify'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  rigger = require('gulp-rigger'),
  cssmin = require('gulp-minify-css'),
  browserSync = require("browser-sync"),
  rimraf = require('rimraf'),
  reload = browserSync.reload;

gulp.task('clean', function (cb) {
  rimraf('./build', cb);
});

gulp.task('copy', function () {
  gulp.src('./src/files/**/*')
    .pipe(gulp.dest('./build/files'));
});

gulp.task('html', function () {
  gulp.src('./src/html/index.html')
    .pipe(rigger())
    .pipe(gulp.dest('./build/'))
    .pipe(reload({stream: true}));
});

gulp.task('styles', function () {
  gulp.src('./src/css/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(prefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cssmin())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/css/'))
    .pipe(reload({stream: true}));
});

gulp.task('js', function () {
  gulp.src('./src/js/main.js')
    .pipe(rigger())
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/js'))
    .pipe(reload({stream: true}));
});

var config = {
  server: {
    baseDir: "./build"
  },
  tunnel: true,
  host: 'localhost',
  port: 9000,
  logPrefix: "dan"
};

gulp.task('webserver', function () {
  browserSync(config);
});

gulp.task('watch', function () {
  watch('./src/html/*.html', function() {
    gulp.start('html');
  });
  watch('./src/css/**/*.scss', function() {
    gulp.start('styles');
  });
  watch('./src/js/main.js', function() {
    gulp.start('js');
  });
  watch('./src/files/**/*', function() {
    gulp.start('copy');
  })
});

gulp.task('default', ['webserver', 'watch']);