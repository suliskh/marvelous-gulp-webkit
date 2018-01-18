import gulp from 'gulp';
import sass from 'gulp-sass';
import cleanCSS from 'gulp-clean-css';
import del from 'del';
import autoprefixer from 'gulp-autoprefixer';
import browserSync from 'browser-sync';
import sourcemaps from 'gulp-sourcemaps';
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
        styles: dirs.src + 'styles/'
    },
    temp: {
        styles: dirs.temp + 'styles/'
    },
    dist: {
        styles: dirs.dist + 'css/'
    }
}

// Compile scss files, run autoprefixer and move those ones into temp folder
// -----
export const scss = () => gulp.src(paths.src.styles + '*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer({ browsers: ['last 2 versions'], cascade: false }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.temp.styles))
    .pipe(bs.stream());

// run autoprefixer for css files
// -----
export const css = () => gulp.src(paths.src.styles + '**/*.css')
    .pipe(autoprefixer({ browsers: ['last 2 versions'], cascade: false }))
    .pipe(gulp.dest(paths.temp.styles))
    .pipe(bs.stream());


// Delete dist and temp folders
// -----
export const clean = () => del([dirs.temp + '**', dirs.dist + '**']);

// Serve and watch on local webserver
// -----
export const play = gulp.series(clean, gulp.parallel(scss, css), () => {
    bs.init({
        notify: false,
        port: 9000,
        server: {
            baseDir: [dirs.temp, dirs.src]
        }
    });
    gulp.watch(paths.src.styles + "**/*.scss", scss);
    gulp.watch(paths.src.styles + "**/*.css", css);
    gulp.watch(dirs.src + "*.html").on('change', bs.reload);
});
