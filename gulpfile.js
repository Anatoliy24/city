'use strict';

const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const clean = require('gulp-clean');
const connect = require('gulp-connect');
const browserSync = require('browser-sync');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const fs = require('fs');




// Эта конструкция работает синхронно, сначала выполняется задача 'clean'
// и только после ее завершнения запускается 'dev'.
gulp.task('default', ['clean'], function() {
  gulp.start('dev');
});

// Запускает build - сборку, watcher - слежку за файлами и browser-sync.
gulp.task('dev', ['build', 'watch', 'browser-sync']);

// Собирает проект.
gulp.task('build', ['pug', 'sass', 'scripts', 'assets']);
// Задача 'watch' следит за всеми нашими файлами в проекте и при изменении тех или иных перезапустает соответсвующую задачу.
gulp.task('watch', function() {
  gulp.watch('./src/css/**/*.scss', ['sass']); //стили
  gulp.watch('./src/js/**/*.js', ['scripts']); //скрипты
  gulp.watch(['./src/**/*.pug'], ['pug']); // pug
  gulp.watch(['./*.json'], ['pug']); // pug
  gulp.watch('./src/assets/**/*.*', ['assets']); //наши локальные файлы(картинки, шрифты)
  gulp.watch('./src/**/*.*').on('change', browserSync.reload); //Перезапуск browserSynс
});

//Задача для компиляции PUG
gulp.task('pug', function buildHTML() {
  var YOUR_LOCALS = './content.json';
  return gulp.src('./src/**/*.pug')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log('Error: ' + error.message);
        this.emit('end');
      }}))
    .pipe(pug({
      pretty : '\t',
    }))
    .pipe(gulp.dest('./public'))
});

//Задача для компиляции SASS
gulp.task('sass', function () {
  return gulp.src('./src/css/**/*.scss')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log('Error: ' + error.message);
        this.emit('end');
      }}))
    .pipe(autoprefixer({
      browsers: ['last 3 versions', '>5%'],
      cascade: false
    }))
    .pipe(sass({
      includePaths: require('node-normalize-scss').includePaths
    }).on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
});

//Перемешение  локальных файлов в папку public
gulp.task('assets', function() {
  return gulp.src('./src/assets/**/*.*')
    .pipe(gulp.dest('./public/assets'));
});

//Задача для удаления папки public.
gulp.task('clean', function() {
  return gulp.src('public/')
    .pipe(clean());
});

gulp.task('scripts', function() {
  gulp.src('./src/js/**/*.js')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log('Error: ' + error.message);
        this.emit('end');
      }}))
    // .pipe(uglify()) //Минификация скриптов.
    .pipe(gulp.dest('public/js'));
});

//Задача для запуска сервера.
gulp.task('browser-sync', function() {
  return browserSync.init({
    server: {
      baseDir: './public/'
    },
    startPath: '/index.html'
    // startPath: '/visa.html'
    // startPath: '/citizenship.html'
    // startPath: '/other-services.html'
    // startPath: '/webinar.html'
    // startPath: '/work-permit.html'
  });
});

