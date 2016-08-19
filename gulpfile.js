var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var pump = require('pump');
var imagemin = require('gulp-imagemin');
var sitemap = require('gulp-sitemap');
var autoprefixer = require('gulp-autoprefixer');




gulp.task('default', ["sass", "js", "img", "sitemap"]);


gulp.task('sass', function () {
   gulp.src('./static/css/*.scss')
   .pipe(sass().on('error', sass.logError))
   .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(concat('all.min.css'))
    .pipe(cleanCSS())
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


gulp.task('sitemap', function () {
    gulp.src('_site/**/*.html', {
            read: false
        })
        .pipe(sitemap({
            siteUrl: 'http://geissonmachado.com.br/',
            changefreq: 'weekly'
        }))
        .pipe(gulp.dest('.'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./static/css/*.scss', ['sass']);
});
