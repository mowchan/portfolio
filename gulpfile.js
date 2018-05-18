var browserSync = require('browser-sync').create();
var gulp = require('gulp');
var concat = require('gulp-concat');
var less = require('gulp-less');
var minify = require('gulp-csso');
var resolveDependencies = require('gulp-resolve-dependencies');
var uglify = require('gulp-uglify');

var source = {
  html: 'pages/*.html',
  files: 'files/*',
  less: 'less/**/*.less',
  scripts: 'js/*.js'
};

var dest = {
  html: 'build',
  files: 'build/files',
  less: 'build/css',
  scripts: 'build/js'
};

function swallowError (error) {
  console.log(error.toString());
  this.emit('end');
}

gulp.task('browserSync', function() {
  return browserSync.init({
    server: {
      baseDir: 'build'
    }
  });
});

gulp.task('html', function () {
  return gulp.src(source.html)
    .pipe(gulp.dest(dest.html))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('files', function () {
  return gulp.src(source.files)
    .pipe(gulp.dest(dest.files));
})

gulp.task('less', function () {
  return gulp.src('less/main.less')
    .pipe(less())
    .on('error', swallowError)
    .pipe(concat('main.css'))
    .pipe(minify())
    .pipe(gulp.dest(dest.less))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('scripts', function () {
  return gulp.src(source.scripts)
    .pipe(resolveDependencies({
      pattern: /\* @requires [/s-]*(.*\.js)/g
    }))
    .on('error', swallowError)
    .pipe(concat('main.js'))
    .pipe(gulp.dest(dest.scripts))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('watch', ['browserSync', 'html', 'files', 'less', 'scripts'], function () {
  gulp.watch(source.html, ['html']);
  gulp.watch(source.less, ['less']);
  gulp.watch(source.scripts, ['scripts']);
});

gulp.task('default', ['html', 'files', 'less', 'scripts']);
