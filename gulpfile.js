var gulp = require('gulp');
var $    = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var reload      = browserSync.reload;

var sassPaths = [
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

gulp.task('sass', function() {
  return gulp.src('scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths,
      outputStyle: 'compressed' // if css compressed **file size**
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream());
});

gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: "./"
    });
    gulp.watch("./scss/*.scss", ['sass']);
    gulp.watch("./*.html").on('change', browserSync.reload);
});


gulp.task('default', ['serve']);
