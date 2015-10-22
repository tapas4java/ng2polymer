var gulp = require('gulp');
var browserSync = require('browser-sync').create();

var PATHS = {
    src: 'src/**/*.ts',
    typings: 'node_modules/angular2/bundles/typings/angular2/angular2.d.ts',
    html: '**/*.html',
    styles: "src/**/*.scss"
};

gulp.task('clean', function (done) {
    var del = require('del');
    del(['dist'], done);
});

// Transpile TypeScipt to Javascript(ES5)
gulp.task('ts2js', function () {
    var typescript = require('gulp-typescript');
    var tsConfig = typescript.createProject('tsconfig.json');
    var tsResult = gulp.src([PATHS.src, PATHS.typings])
        .pipe(typescript(tsConfig));

    return tsResult.js.pipe(gulp.dest('dist'));
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    var sass = require('gulp-sass');
    return gulp.src(PATHS.styles)
        .pipe(sass())
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

// If any ts file changed, transpile ts to js and reload browser
gulp.task('ts-watch', ['ts2js'], function() {
    browserSync.reload();
});

// Launch a development server with auto reload feature
gulp.task('serve', ['ts2js', 'sass'], function () {
    
    browserSync.init({
        port: 8080,
        logConnections: true,
        logFileChanges: true,
        logSnippet: false,
        open: "local",
        reloadOnRestart: true,
        notify: true,
        server: {
            baseDir: "./"
        }
    });
    
    // Watch for file changes
    gulp.watch(PATHS.src, ['ts-watch']);
    gulp.watch(PATHS.styles, ['sass']);
    gulp.watch(PATHS.html).on("change", browserSync.reload);
});

gulp.task('default', ['serve']);

