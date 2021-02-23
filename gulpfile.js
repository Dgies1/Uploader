const gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    path = require('path'),
    builder = require('gulp-nw-builder'),
    cleanCSS = require('gulp-clean-css');

sass.compiler = require('node-sass');





const combineCss = () => {
    const modules = path.resolve(__dirname, 'node_modules')
    let files = [
        modules + '/bulma/css/bulma.css',
        './src/public/css/*.css'
    ]
    return gulp.src(files)
        .pipe(concat('style.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./dist/public/css/'));

}

const css = () => {
    return gulp.src('./src/public/css/sass/*.scss').pipe(sass())
        .pipe(gulp.dest('./src/public/css/'))
}

const build = () => {

    let files = [
        "./src/app/**/*.*",
        "./src/config/**/*.*",
        "./src/public/css/*.css",
        "./src/package.json"
        ];
    return gulp.src(files, {
        base: "./src/"
    })
    .pipe(gulp.src('./app.js'))
    .pipe(gulp.dest('./dist/'))


}



exports.sass = gulp.series(css, combineCss);

exports.build = gulp.series(build,css, combineCss);;

exports.peek = () => {
    gulp.watch('./src/public/css/sass/*.scss', gulp.series(css, combineCss));
}