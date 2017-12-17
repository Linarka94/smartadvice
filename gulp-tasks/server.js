let browserSync = require('browser-sync');
let connect = require('gulp-connect');
let gulp = require('gulp');


gulp.task('server-dev', ['removePublic', 'fonts', 'scriptsVendor', 'scripts', 'stylesVendor', 'styles', 'views'], () => {
	browserSync({
		server: {
			baseDir: 'public'
		},
		notify: false
	});
});

gulp.task('server-prod', ['removePublic', 'fonts', 'scripts', 'scriptsVendor', 'styles', 'stylesVendor', 'views'], () => {
  connect.server({
    root: 'public',
    port: process.env.PORT || 3000,
    livereload: false
  });
});