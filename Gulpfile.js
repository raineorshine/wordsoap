gulp =       require('gulp')
plumber =    require('gulp-plumber')
sweetjs =    require('gulp-sweetjs')
sourcemaps = require('gulp-sourcemaps')
replace =    require('gulp-replace')

config = {
	src: 'src/**/*.js',
	dest: 'build'
}

gulp.task('build', function() {
  gulp.src(config.src)
  	.pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(replace(/◦/g, 'compose'))
    .pipe(sweetjs({
      modules: [
      	'lambda-chop/macros',
      	'sweet-compose'
      ]
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.dest));
})

gulp.task('watch', function() {
	gulp.watch(config.src, ['build'])
});

gulp.task('default', ['watch', 'build'])
