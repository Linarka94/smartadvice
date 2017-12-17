let browserSync = require('browser-sync');
let cache = require('gulp-cache');
let imageMin = require('gulp-imagemin');
let gulp = require('gulp');
let pngQuant = require('imagemin-pngquant');

gulp.task('images', () => {
	return gulp.src('src/images/**/*')
	.pipe(cache(imageMin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		une: [pngQuant()],
		verbose: true
	})))
	.pipe(gulp.dest('public/assets/img'));
});

gulp.task('imagesCleanCache', () => {
	return cache.clearAll();
});
