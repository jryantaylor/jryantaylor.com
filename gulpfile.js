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
			// './vendor/javascripts/bootstrap/affix.js',
			// './vendor/javascripts/bootstrap/alert.js',
			// './vendor/javascripts/bootstrap/button.js',
			// './vendor/javascripts/bootstrap/carousel.js',
			// './vendor/javascripts/bootstrap/collapse.js',
			// './vendor/javascripts/bootstrap/dropdown.js',
			// './vendor/javascripts/bootstrap/modal.js',
			'./vendor/javascripts/bootstrap/scrollspy.js',
			// './vendor/javascripts/bootstrap/tab.js',
			// './vendor/javascripts/bootstrap/tooltip.js',
		// popover.js requires tooltip.js
			// './vendor/javascripts/bootstrap/popover.js',
			// './vendor/javascripts/bootstrap/transition.js',
		// site js with jQuery/bootstrap dependencies
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