const gulp = require('gulp');
const less = require('gulp-less');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const browserSync = require('browser-sync');
const stylus = require('gulp-stylus');

let popup = 'popUp';

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: `${popup}`,
      index: `/dist/index.html`
    },
    port: 3000
  });
});

gulp.task('styl', function() {
  gulp.src(`${popup}/src/**/*.styl`)
    // .pipe(stylus({compress: true}))
    .pipe(stylus())
    .pipe(gulp.dest(`${popup}/dist/`))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('js', function() {
  gulp.src(`${popup}/src/**/*.js`)
    .pipe(babel())
    // .pipe(uglify())
    .pipe(gulp.dest(`${popup}/dist/`))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('html', function() {
  gulp.src(`${popup}/src/**/*.html`)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(`${popup}/dist/`))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task(`${popup}_watch`, ['browserSync', 'styl', 'js', 'html'], function() {
  gulp.watch(`${popup}/**/*`, ['styl', 'js', 'html']);
});

// gulp.task(popup, function() {
//   util(popup);
// });
// gulp.task(`${popup}_watch`, function() {
//   gulp.watch(`${popup}/**/*`, [`${popup}`]);
// });