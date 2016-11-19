'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');


gulp.task('sass', function () {
    return gulp.src('*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'))
    .pipe(livereload());
});


gulp.task('reload', function () {
    gulp.src('*.html')
        .pipe(livereload());
});

gulp.task('default', function () {
    livereload.listen();
    gulp.watch('*.scss', ['sass']);
    gulp.watch('*.html', ['reload']);
    gulp.watch('*.js', ['reload']);

});

