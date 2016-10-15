//
// dependencies
//

var gulp = require('gulp');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var watch = require("gulp-watch");
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var jade = require("gulp-jade");
var concat = require('gulp-concat');
var plumber = require("gulp-plumber");
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gzip = require('gulp-gzip');
var webpagetest = require('gulp-webpagetest');
var del = require('del');
var cleanCSS = require('gulp-clean-css');
var inline = require('gulp-inline-css');
var uncss = require('gulp-uncss');
var purify = require('gulp-purifycss');
var htmlmin = require('gulp-htmlmin');

//
// paths
//

var paths = {
	styles: {
		src: "./stylesheets/*.scss",
		dest: "./docs/css"
	},
	templates: {
		src: {
			watch: ["./templates/*.jade"],
			build: ["./templates/index.jade"]
		},
		dest: "./docs"
	},
	favicon: {
		src: './favicon.ico',
		dest: './docs'
	},
	cname: {
		src: './CNAME',
		dest: './docs'
	}
};



//
// styles
//

gulp.task('styles', function() {
	return gulp.src(paths.styles.src)
		.pipe(gutil.env.env === 'dev' ? sourcemaps.init() : gutil.noop())
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false,
			remove: false
		}))
		.pipe(gutil.env.env === 'dev' ? sourcemaps.write('./maps') : gutil.noop())
        .pipe(gutil.env.env === 'prod' ? cleanCSS({compatibility: 'ie10'}) : gutil.noop())
		// .pipe(gutil.env.env === 'prod' ? uncss({
  //           html: ['./index.html'],
  //           ignore: [
  //           	'@font-face',
  //           	'::selection'
  //           ]
  //       }) : gutil.noop())
        .pipe(gutil.env.env === 'prod' ? purify(
        	['./docs/js/*.js','./docs/*.html'],
        	{ info: true, rejected: true}) : gutil.noop())
		.pipe(gulp.dest(paths.styles.dest))
});



//
// templates
//

gulp.task("templates", function() {
	gulp.src(paths.templates.src.build)
		.pipe(plumber())
		.pipe(jade({
			pretty: false
		}))
		.pipe(plumber.stop())
		.pipe(gutil.env.env === 'prod' ? htmlmin({collapseWhitespace: true}) : gutil.noop())
		.pipe(gulp.dest(paths.templates.dest))
});



//
// inline css
//

gulp.task('inline', function() {
    return gulp.src('./docs/index.html')
        .pipe(inline({
			applyStyleTags: true,
			applyLinkTags: true,
			removeStyleTags: false,
			removeLinkTags: true
        }))
        .pipe(gulp.dest(paths.templates.dest));
});



//
// clean tasks
//

gulp.task('clean:docs', function () {
	return del([
		'./docs',
	]);
});

gulp.task('clean:css', function () {
	return del([
		'./docs/css',
	]);
});



//
// favicon
//

gulp.task('favicon', function() {
	return gulp.src(paths.favicon.src)

		.pipe(gulp.dest(paths.favicon.dest))
});



//
// cname
//

gulp.task('cname', function() {
	return gulp.src(paths.cname.src)

		.pipe(gulp.dest(paths.cname.dest))
});


//
// webpagetest
//

gulp.task('webpagetest', webpagetest({
  url: 'http://jryantaylor.com',
  key: 'A.feeac109bfed923629d9639b762cebeb',
  location: 'Dulles:Chrome',
  firstViewOnly: true,
  output: 'test/results.json',
  budget: {
    SpeedIndex: 1000,
    visualComplete: 1000
  },
  callback: function() {
    console.log('WPT test done !');
  }
}));


//
// watch
//

gulp.task('watch', function() {
	gulp.watch(paths.styles.src, ["styles"]);
	gulp.watch(paths.templates.src.watch, ["templates"]);
});