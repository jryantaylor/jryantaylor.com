var gulp = require('gulp');
var watch = require("gulp-watch");
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var jade = require("gulp-jade");
var concat = require('gulp-concat');
var plumber = require("gulp-plumber");
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');
var gzip = require('gulp-gzip');

var paths = {
	styles: {
		src: [
			"./stylesheets/*.scss",
			"./stylesheets/*/*.scss",
			"./stylesheets/*/*/*.scss"
			],
		dest: "./dist/css"
	},
	templates: {
		src: [
			"./templates/*.jade",
			],
		dest: "./dist/"
	},
	scripts: {
		src: [
		// vendor js
			// './javascripts/vendor/bootstrap/affix.js',
			// './javascripts/vendor/bootstrap/alert.js',
			// './javascripts/vendor/bootstrap/button.js',
			// './javascripts/vendor/bootstrap/carousel.js',
			'./javascripts/vendor/bootstrap/collapse.js',
			// '.javascripts/vendor/bootstrap/dropdown.js',
			// '.javascripts/vendor/bootstrap/modal.js',
			'./javascripts/vendor/bootstrap/scrollspy.js',
			// '.javascripts/vendor/bootstrap/tab.js',
			// './javascripts/vendor/bootstrap/tooltip.js',
		// popover.js requires tooltip.js
			// './javascripts/vendor/bootstrap/popover.js',
			'./javascripts/vendor/bootstrap/transition.js',
		// site js with jQuery/vendor dependencies
			'./javascripts/main.js',
			],
		dest: "./dist/js",
	},
};

gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: 'dist'
		},
	})
});

gulp.task('styles', function() {
	return gulp.src(paths.styles.src)
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(paths.styles.dest))
		.pipe(browserSync.reload({
			stream: true
		}))
});

gulp.task("templates", function() {
	gulp.src('./templates/*.jade')
		.pipe(plumber())
		.pipe(jade({
			pretty: '\t'    // Set to false to minify/uglify
		}))
		.pipe(plumber.stop())
		.pipe(gulp.dest(paths.templates.dest))
		.pipe(browserSync.reload({
			stream: true
		}))
});

gulp.task('scripts', function() {
	return gulp.src(paths.scripts.src)
	.pipe(concat('main.js'))
	.pipe(sourcemaps.write())
	// .pipe(uglify())
	.pipe(gulp.dest(paths.scripts.dest))
	.pipe(browserSync.reload({
		stream: true
	}))
});
 
gulp.task("default", ['browserSync'], function() {
	gulp.watch(paths.styles.src, ["styles"]);
	gulp.watch(paths.templates.src, ["templates"]);
	gulp.watch(paths.scripts.src, ["scripts"]);
});