let eslint = require('gulp-eslint');
let gulp = require('gulp');

gulp.task('eslint', () => {
	return gulp.src(['src/scripts/*.js'], ['!src/scripts/vendor/*'])
		.pipe(eslint({configFile: 'eslintrc.json', fix: true}) )
		.pipe(eslint.format())
    .pipe(eslint.result(result => {
    }));
});