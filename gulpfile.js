// Gulp only handles CSS stuff.
// For everything else, please see .eleventy.js

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');

sass.compiler = require('node-sass');

var scss = function(cd){
    return gulp.src('src/_styles/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([ autoprefixer() ]))
        .pipe(gulp.dest('dist/_styles'));
    cd();
}

var watchScss = function(cd){
    gulp.watch('src/_styles/**/*.scss', scss);
    cd();
}

exports.scss = scss;
exports.default = watchScss;