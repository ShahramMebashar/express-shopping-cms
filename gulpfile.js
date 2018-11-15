const gulp = require('gulp'),
      sass = require('gulp-sass'),
      browserSync = require('browser-sync').create(),
      reload = browserSync.reload,
      nodemon = require('gulp-nodemon');

const config = {
    server: {
        host: 'http://localhost',
        port: process.env.PORT || 8888,
        baseDir: './',
        proxy: `http://localhost:${process.env.PROXY || 3000}`,
        open: true
    },
    sass: {
        src: './public/scss/*.scss',
        dest: './public/css'
    }

}
gulp.task('sass', function () {
    gulp.src(config.sass.src)
    .pipe(sass())
    .pipe(gulp.dest(config.sass.dest))
    .pipe(browserSync.stream())
});

gulp.task('serve', ['sass'], function () {
    //Server 
    browserSync.init(config.server);

    //Watch for files
    gulp.watch(config.src, ['sass']);
    gulp.watch('./views/**/*.hbs').on('change', reload);
    gulp.watch(['./models/*.js', './routes/*.js', './controllers/*.js']).on('change', reload);
});

gulp.task('default', ['serve']);     