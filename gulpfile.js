var browserSync = require('browser-sync').create();
var gulp = require('gulp');
var concat = require('gulp-concat');
var minify = require('gulp-csso');
var less = require('gulp-less');

var paths = {
  html: './pages/*.html',
  less: './less/**/*.less'
};

gulp.task('browserSync', function() {
  return browserSync.init({
    server: {
      baseDir: 'build'
    }
  });
});

gulp.task('html', function () {
  return gulp.src(paths.html)
    .pipe(gulp.dest('build'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('less', function () {
  return gulp.src(paths.less)
    .pipe(less())
    .pipe(concat('main.css'))
    .pipe(minify())
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('watch', ['browserSync', 'html', 'less'], function () {
  gulp.watch(paths.less, ['less']);
  gulp.watch(paths.html, ['html']);
});

gulp.task('default', ['html', 'less']);
