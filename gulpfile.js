const 
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    path = require('path'),
    livereload = require('gulp-livereload'),
    nodemon = require('gulp-nodemon'),
    plumber = require('gulp-plumber'),
    cleanCSS = require('gulp-clean-css');

sass.compiler = require('node-sass');



const compileCss = () => {
    const modules = path.resolve(__dirname, 'node_modules')
    let files = [
        modules + '/bulma/css/bulma.css',
        './src/public/css/*.css'
    ]
    return gulp.src('./src/public/css/sass/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('./src/public/css/'))
    .pipe(gulp.src(files)
    .pipe(concat('style.css'))
    .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
    .pipe(gulp.dest('./src/public/css/'))
    .pipe(livereload()));

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


const develop = () => {
    livereload.listen();
    nodemon({
        script: './app.js',
        ext: 'js coffee handlebars',
        stdout: false
    }).on('readable', function () {
        this.stdout.on('data', (chunk) => {
            if (/^Express server listening on port/.test(chunk)) {
                livereload.changed(__dirname);
            }
        });
        this.stdout.pipe(process.stdout);
        this.stderr.pipe(process.stderr);
    });
}


const peek = () => {
    gulp.watch('./src/public/css/sass/style.scss', gulp.series(css, combineCss))
}


exports.dev = gulp.series(compileCss,develop,peek);
exports.sass = gulp.series(compileCss);
exports.prod = gulp.series(compileCss,build)




exports.peek = peek;