const gulp = require('gulp');
const less = require('gulp-less');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const browserSync = require('browser-sync');
const stylus = require('gulp-stylus');


/**
 * 通用的编译函数
 * @param {项目的相对于根目录的路径,如demo1} projectRootPath 
 */

// function util(projectRootPath) {
//   browserSync({
//     server: {
//       baseDir: `${projectRootPath}`
//     }
//   });
//   gulp.src(`${projectRootPath}/src/**/*.styl`)
//     // .pipe(stylus({compress: true}))
//     .pipe(stylus())
//     .pipe(gulp.dest(`${projectRootPath}/dist/`));
//     // .pipe(browserSync.reload({stream:true}));
//   gulp.src(`${projectRootPath}/src/**/*.js`)
//     .pipe(babel())
//     // .pipe(uglify())
//     .pipe(gulp.dest(`${projectRootPath}/dist/`));
//     // .pipe(browserSync.reload({stream:true}));
//   gulp.src(`${projectRootPath}/src/**/*.html`)
//     .pipe(htmlmin({ collapseWhitespace: true }))
//     .pipe(gulp.dest(`${projectRootPath}/dist/`))
//     .pipe(browserSync.reload({stream:true}));
//   console.log('完成');
// }


let popup = 'popup';

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: `${popup}`
    }
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