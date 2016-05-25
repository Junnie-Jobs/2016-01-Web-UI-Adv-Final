var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var concatCss = require('gulp-concat-css');
var jscs = require('gulp-jscs');

gulp.task('jscs', () => {
    return gulp.src('./js/*.js')
        .pipe(jscs())
        .pipe(jscs.reporter());
});

gulp.task('js-compress', function() {
  return gulp.src('dist/all.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('css-compress', function() {
  return gulp.src('dist/*.css')
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('compress', ['js-compress','css-compress'],function(){

});
gulp.task('default',['js-compress','css-compress', 'concat'], function() {

  	gulp.watch("./js/*.js", ['concat']).on("change",function(){

    });
    gulp.watch("./js/*.js",['jscs'].on("change",function () {

    }))
});

gulp.task('js-concat', function() {
  return gulp.src('js/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('css-concat', function () {
  return gulp.src('lib/*.css')
    .pipe(concatCss("styles/bundle.css"))
    .pipe(gulp.dest('dist'));
});
