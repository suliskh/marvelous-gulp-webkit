import gulp from 'gulp';
import sass from 'gulp-sass';
import cleanCSS from 'gulp-clean-css';
import del from 'del';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';
import plumber from 'gulp-plumber';
import uglify from 'gulp-uglify';
import useref from 'gulp-useref';
import gulpif from 'gulp-if';
import imagemin from 'gulp-imagemin';

import browserSync from 'browser-sync';
const bs = browserSync.create();

// Variables
// -----
const dirs = {
    src: 'src/',
    temp: '.tmp/',
    dist: 'dist/'
}
const paths = {
    src: {
        styles: dirs.src + 'styles/',
        scripts: dirs.src + 'scripts/',
        images: dirs.src + 'images/'
    },
    temp: {
        styles: dirs.temp + 'styles/',
        scripts: dirs.temp + 'scripts/'
    },
    dist: {
        styles: dirs.dist + 'css/',
        scripts: dirs.dist + 'js/',
        images: dirs.dist + 'images/'
    }
}

// Compile scss files, run autoprefixer and move those into temp folder
// -----
export const scss = () => gulp.src(paths.src.styles + '*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer({ browsers: ['last 2 versions'], cascade: false }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.temp.styles))
    .pipe(bs.stream());

// Run autoprefixer for css files
// -----
export const css = () => gulp.src(paths.src.styles + '**/*.css')
    .pipe(autoprefixer({ browsers: ['last 2 versions'], cascade: false }))
    .pipe(gulp.dest(paths.temp.styles))
    .pipe(bs.stream());


// Transpile javascripts using Babel and move those into temp folder
// -----
export const scripts = () => gulp.src(paths.src.scripts + '**/*.js')
    .pipe(plumber())
    .pipe(babel())
    .pipe(plumber.stop())
    .pipe(gulp.dest(paths.temp.scripts))
    .pipe(bs.stream());

// Minify image
// -----
export const images = () => gulp.src(paths.src.images + "**/*")
    .pipe(imagemin())
    .pipe(gulp.dest(paths.dist.images));


// Delete dist and temp folders
// -----
export const clean = () => del([dirs.temp + '**', dirs.dist + '**']);

// Serve and watch on local webserver
// -----
export const play = gulp.series(clean, gulp.parallel(scripts, scss, css), () => {
    bs.init({
        notify: false,
        port: 9000,
        server: {
            baseDir: [dirs.temp, dirs.src]
        }
    });
    gulp.watch(paths.src.styles + "**/*.scss", scss);
    gulp.watch(paths.src.styles + "**/*.css", css);
    gulp.watch(paths.src.scripts + "**/*.js", scripts);
    gulp.watch([
        dirs.src + "*.html",
        "src/images/**/*" 
    ]).on('change', bs.reload);
});

export const build = gulp.series(clean, gulp.parallel(scripts, scss, css, images), () => {
    return gulp.src(dirs.src + "*.html")
        .pipe(useref({searchPath: [dirs.temp, dirs.src]}))
        .pipe(gulpif('*.css', cleanCSS()))
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulp.dest(dirs.dist))
});
