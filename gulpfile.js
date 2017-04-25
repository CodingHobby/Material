const gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserify = require('gulp-browserify'),
	uglify = require('gulp-uglify'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync').create()

gulp.task('serve', ['sass', 'js'], function () {
	browserSync.init({
			server: {
				baseDir: "./"
			}
		})
	
	gulp.watch('./sass/**/*.sass', ['sass-watch'])
	gulp.watch('./js/**/*.js', ['js-watch'])
	gulp.watch('./*.html').on('change', browserSync.reload)
})

gulp.task('sass', function() {
	return gulp.src('./sass/material.sass')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('lib/'))
		.pipe(browserSync.stream())
})

gulp.task('js', function() {
	return gulp.src('./js/material.js')
		.pipe(browserify())
		.pipe(uglify())
		.pipe(gulp.dest('lib/'))
		.pipe(browserSync.stream())
})

gulp.task('js-watch', ['js'], function(done) {
	browserSync.reload()
	done()
})

gulp.task('sass-watch', ['sass'], function(done) {
	browserSync.reload()
	done()
})

gulp.task('default', ['serve'])