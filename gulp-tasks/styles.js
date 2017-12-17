let argv = require('yargs').argv;
let autoprefixer = require('gulp-autoprefixer');
let browserSync = require('browser-sync');
let concat = require('gulp-concat');
let gulp = require('gulp');
let gulpif = require('gulp-if');
let sass = require('gulp-sass');

gulp.task('styles', function() {	
  return gulp.src([
    'src/styles/**/**/*.sass', 
    '!src/styles/libs.sass'
    ])
    .pipe(concat('styles.sass'))
    .pipe(gulpif( argv.p, sass({outputStyle: 'compressed'}).on('error', sass.logError)) )
    .pipe(gulpif( !argv.p, sass().on('error', sass.logError)) )
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
    .pipe(gulp.dest('public'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('stylesVendor', function() {  
  return gulp.src('src/styles/libs.sass')
    .pipe(concat('libs.min.sass'))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('public'))
    .pipe(browserSync.reload({stream: true}))
});