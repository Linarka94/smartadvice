let gulp = require('gulp');
let requireDir = require('require-dir');
let gulpCommand = require('gulp-command')(gulp);

requireDir('./gulp-tasks');

gulp
  .option('build', '-p, --production', 'Flag to start production build')
  .option('build', '-w, --watch', 'Flag to start watch task')
  .task('build', function(){
      (this.flags.production) ? gulp.start('server-prod') : gulp.start('server-dev');

      gulp.start('images');

      if (this.flags.watch) {
      	gulp.start('watch')
      }
  });