// cd build/

var gulp = require('gulp')
	, serve = require('gulp-serve')
	, concat = require('gulp-concat')
	, uglify = require('gulp-uglify')
	, at = require('gulp-asset-transform')
	, rev = require('gulp-rev')
	, minifyHtml = require('gulp-minify-html')
	, cssnano = require('gulp-cssnano')
	, less = require('gulp-less')
	, ngAnnotate = require('gulp-ng-annotate')
	, install = require('gulp-install')
	, zip = require('gulp-zip')
	, merge = require('merge-stream')
	, rename = require('gulp-rename')
	, eslint = require('gulp-eslint')
	, args = require('yargs').argv
	, path = require('path')
;

gulp.task('serve', serve({
	root:[path.join(__dirname, 'src')],
	port:8000
}));

gulp.task('default', ['watch']);

gulp.task('install-client', function(){
	return gulp.src(['./bower.json'])
		.pipe(install());
})

gulp.task('install', function(){
	return gulp.src('./package.json')
		.pipe(gulp.dest('./build/'))
		.pipe(install({production:true}));
})

gulp.task('copy-images', function(){

})

gulp.task('build',[/*'install', 'install-client'*/], function(){

	var src = gulp.src(['./src/server/**/*.js',
		'./src/server/config/*.json',
		'./src/.sequelizerc',
		'./src/client/**/*.html',
		'!./src/client/index.html'], { base: './src'});

	var images = gulp.src('./src/client/assets/img/**/*')
		.pipe(gulp.dest('./build/client/assets/img'));


	var mins = gulp.src('./src/client/index.html')
		.pipe(at({
			less: {
				stream:function(filestream, outputFilename){
					return filestream
						.pipe(less())
						.pipe(cssnano())
						.pipe(concat(outputFilename));
				}
			},
			js: {
				stream:function(filestream, outputFilename){
					return filestream
						.pipe(ngAnnotate())
						.pipe(uglify())
						.pipe(concat(outputFilename))
						.pipe(rev());
				}
			}
		}))
		.pipe(rename(function (path) {
			path.dirname = "/client/" + path.dirname;
			return path;
		}));

	var merged = merge(src, mins);
	return merged.pipe(gulp.dest('./build'))

	return [images, merged]
});

gulp.task('lint', function () {
	return gulp.src(['./src/**/*.js', '!./src/client/bower_components/**/*'])
		// eslint() attaches the lint output to the eslint property
		// of the file object so it can be used by other modules.
		.pipe(eslint({
			"rules":{
				"camelcase": 1,
				"comma-dangle": 2,
				"quotes": 0
			},
			"env": {
				"browser": true,
				"node": true
			}
		}))
		// eslint.format() outputs the lint results to the console.
		// Alternatively use eslint.formatEach() (see Docs).
		.pipe(eslint.format())
		// To have the process exit with an error code (1) on
		// lint error, return the stream and pipe to failAfterError last.
		.pipe(eslint.failAfterError());
});
