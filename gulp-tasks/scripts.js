let browserSync = require('browser-sync');
let concat = require('gulp-concat');
let gulp = require('gulp');
let gulpif = require('gulp-if');
let uglify = require('gulp-uglifyjs');

gulp
  .option('build', '-p, --production', 'Flag to start production build')
  .task('scripts', function() {
    console.log(this.flags.production);
    return gulp.src('src/scripts/*.js')
    .pipe(concat('scripts.js'))
    .pipe(gulpif(this.flags.production, uglify() )).on('error', function(error) {
        console.error(error.message);
        console.log('------------------------------------------- \n \n');
        this.emit('end');
    })  
    .pipe(gulp.dest('public'))
    .pipe(browserSync.reload({stream: true}));
  }
);




gulp.task('scriptsVendor', () => {
  return gulp.src('src/scripts/vendor/*.js')
  .pipe(concat('libs.min.js'))
  .pipe(gulp.dest('public'))
  .pipe(browserSync.reload  ({stream: true}))
});