var gulp = require('gulp');
var sass = require('gulp-sass');


gulp.task('default', ['sass', "sass:watch"]);


gulp.task('sass', function () {
  return gulp.src('./static/css/*.scss')
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(gulp.dest('./static/css/final'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./static/css/*.scss', ['sass']);
});
