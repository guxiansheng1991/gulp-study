const gulp = require('gulp');
const less = require('gulp-less');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const browserSync = require('browser-sync');


/**
 * 通用的编译函数
 * @param {项目的相对于根目录的路径,如demo1} projectRootPath 
 */
function util(projectRootPath) {
  browserSync({
    server: {
      baseDir: `${projectRootPath}`
    }
  });
  gulp.src(`${projectRootPath}/src/**/*.less`)
    .pipe(less())
    .pipe(cleanCSS())
    .pipe(gulp.dest(`${projectRootPath}/dist/`))
    .pipe(browserSync.reload({stream: true}));
  gulp.src(`${projectRootPath}/src/**/*.js`)
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest('demo1/dist/'))
    .pipe(browserSync.reload({stream: true}));
  gulp.src(`${projectRootPath}/src/**/*.html`)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(`${projectRootPath}/dist/`))
    .pipe(browserSync.reload({stream: true}));
}

/**
 * 如需编译不同的项目,需要更改package.json中的script,可复制其中的dev和build命令
 * 项目目录需要src,lib,主要代码应放在src下
 * 新项目运行在 localhost:3000/dist/index.html 中
 */
let demo1 = 'demo1';
gulp.task(demo1, function() {
  util(demo1);
});
gulp.task(`${demo1}_watch`, function() {
  gulp.watch(`${demo1}/**/*`, [`${demo1}`]);
});

let demo2 = 'demo2';
gulp.task(demo2, function() {
  util(demo2);
});
gulp.task(`${demo2}_watch`, function() {
  gulp.watch(`${demo2}/**/*`, [`${demo2}`]);
});

/** 新项目示例如下
 * "build": "gulp task2",
 * "dev": "gulp task2_watch"
 */
// gulp.task('task2_watch', function() {
//   let baseDir = 'demo2';
//   gulp.watch(`${baseDir}/**/*`, function() {
//     util(baseDir);
//   });
// });