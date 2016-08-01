var gulp = require('gulp');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
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
var favicons = require('gulp-favicons');

//
// paths
//

var paths = {
	styles: {
		src: [
			"./stylesheets/main.scss",
			// "./stylesheets/**/*.scss",
			// "./stylesheets/**/**/*.scss",
			// "./stylesheets/**/**/**/*.scss"
			],
		dest: "./css"
	},
	templates: {
		src: [
			"./templates/*.jade",
			"!./templates/_head.jade",
			"!./templates/_foot.jade"
			],
		dest: "./"
	}
};


//
// styles
//

gulp.task('styles', function() {
	return gulp.src(paths.styles.src)
		// .pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		// .pipe(sourcemaps.write())
        .pipe(cleanCSS({compatibility: 'ie10'}))
		.pipe(uncss({
            html: ['./index.html'],
            ignore: [
            	'@font-face',
            	'::selection'
            ]
        }))
		.pipe(gulp.dest(paths.styles.dest))
});


//
// inline css
//

gulp.task('inline', function() {
    return gulp.src('./index.html')
        .pipe(inline({
			applyStyleTags: true,
			applyLinkTags: true,
			removeStyleTags: false,
			removeLinkTags: true
        }))
        .pipe(gulp.dest('./'));
});


//
// templates
//

gulp.task("templates", function() {
	gulp.src('./templates/*.jade')
		.pipe(plumber())
		.pipe(jade({
			pretty: '\t'
		}))
		.pipe(plumber.stop())
		.pipe(gulp.dest(paths.templates.dest))
});


//
// clean:dist
//

gulp.task('clean:dist', function () {
	return del([
		'./dist',
	]);
});


//
// favicons
//

gulp.task("favicons", function () {
    return gulp.src("logo.png").pipe(favicons({
        background: "#fff",
        path: "favicons/",
        url: "http://jryantaylor.com/",
        orientation: "portrait",
        version: 1.0,
        logging: true,
        online: false,
        html: "./_favicons.html",
        pipeHTML: true,
        replace: true,
        icons: {
            android: false,
            appleIcon: false,
            appleStartup: false,
            coast: false,
            favicons: true,
            firefox: false,
            opengraph: false,
            twitter: false,
            windows: false,
            yandex: false
        }
    }))
    .on("error", gutil.log)
    .pipe(gulp.dest("./favicons/"));
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

gulp.task("default", function() {
	gulp.watch(paths.styles.src, ["styles"]);
	gulp.watch(paths.templates.src, ["templates"]);
});