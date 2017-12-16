var gulp = require('gulp'),
	sass = require('gulp-sass'),
	pug = require('gulp-pug'),
	browserSync = require('browser-sync'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglifyjs')
	cssnano = require('gulp-cssnano'),
	rename = require('gulp-rename'),
	del = require('del'),
	imageMin = require('gulp-imagemin'),
	pngQuant = require('imagemin-pngquant'),
	cache = require('gulp-cache'),
	autoprefixer = require('gulp-autoprefixer');
let connect = require('gulp-connect');

gulp.task('clean', function () {
	return del.sync('public');
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'public'
		},
		notify: false
	});
});

gulp.task('pug', function () {	
	return gulp.src('src/pug/*.pug')
			.pipe(pug())
			.pipe(gulp.dest('public'))
			.pipe(browserSync.reload({stream: true}))
});

gulp.task('sass', function () {	
	return gulp.src([
			'src/sass/libs.sass',
			'src/sass/**/**/*.sass'
			])
			.pipe(concat('styles.sass'))
			.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
			.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
			.pipe(gulp.dest('public'))
			.pipe(browserSync.reload({stream: true}))
});

gulp.task('scripts', function () {
	return gulp.src([
		'src/libs/js/*.js',
		'src/js/**/*.js'
	])
	.pipe(concat('scripts.js'))
	.pipe(uglify())
	.pipe(gulp.dest('public'))
	.pipe(browserSync.reload({stream: true}))
});

gulp.task('img', function () {
	return gulp.src('src/img/**/*')
	// .pipe(cache(imageMin({
	// 	interlaced: true,
	// 	progressive: true,
	// 	svgoPlugins: [{removeViewBox: false}],
	// 	une: [pngQuant()],
	// 	verbose: true
	// })))
	.pipe(gulp.dest('public/assets/img'));
});

gulp.task('cleanCache', function () {
	return cache.clearAll();
});

gulp.task('replace', function () {
	var buildFonts = gulp.src('src/fonts/**/*')
	.pipe(gulp.dest('public/assets/fonts'))
	.pipe(browserSync.reload({stream: true}))
});

gulp.task('production', ['clean', 'pug', 'sass', 'scripts', 'img', 'replace'], function() {
  connect.server({
    root: 'public',
    port: process.env.PORT || 3000,
    livereload: false
  });
});

gulp.task('watch', ['clean', 'browser-sync', 'pug', 'sass', 'scripts', 'img', 'replace'], function() {
	gulp.watch('src/pug/**/**/*.pug', ['pug'])
	gulp.watch('public/*.html', browserSync.reload)
	gulp.watch('src/sass/**/*.sass', ['sass'])
	gulp.watch('src/js/**/*.js', ['scripts'])
	gulp.watch('src/img/**/*.png', ['img'])
	gulp.watch('src/img/svg/**/*.svg', ['replace'])
	gulp.watch('src/fonts/**/*', ['replace'])

});

// gulp.task('csslibs', function () {
	// return gulp.src([
		// 'src/libs/magnific-popup/dist/magnific-popup.css'
		// ])
		// .pipe(cssnano())
		// .pipe(rename('libs.min.css'))
		// .pipe(gulp.dest('src/libs/css'))
// });
