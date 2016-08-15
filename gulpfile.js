var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var pump = require('pump');
var imagemin = require('gulp-imagemin');



gulp.task('default', ["sass", "js", "img"]);


gulp.task('sass', function () {
  return gulp.src('./static/css/*.scss')
  .pipe(concat('all.min.css'))
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(gulp.dest('./static/css/final'));
});


gulp.task('js', function (cb) {
  pump([
        gulp.src('static/js/*.js'),
        uglify(),
        gulp.dest('static/js/final')
    ],
    cb
  );
});


gulp.task('img', function (){
    gulp.src('static/image/*')
        .pipe(imagemin())
        .pipe(gulp.dest('static/image/final'))
});


gulp.task('sass:watch', function () {
  gulp.watch('./static/css/*.scss', ['sass']);
});
