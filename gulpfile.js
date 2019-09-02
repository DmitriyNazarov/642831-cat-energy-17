"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var less = require("gulp-less");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var sprite = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var del = require("del");

gulp.task("css", function () {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.mini.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("imagemin", function () {
  return gulp.src("source/img/**/*.{jpg,png,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationlevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"));
})

gulp.task("webp", function () {
  return gulp.src("source/img/**/*.{jpg,png}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("source/img"));
})

gulp.task("sprite", function () {
  return gulp.src([
      "source/img/icon-vk.svg",
      "source/img/icon-insta.svg",
      "source/img/icon-fb.svg",
      "source/img/htmlacademy.svg",
      "source/img/icon-mail.svg",
      "source/img/icon-phone.svg"])
    .pipe(sprite())
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
})

gulp.task("copy", function() {
  return gulp.src([
    "source/fonts/*.{woff,woff2}",
    "source/img/*",
    "source/js/*",
    "source/*.ico",
    "source/*.html"
    ], {
      base: "source"
    })
    .pipe(gulp.dest("build"));
})

gulp.task("refresh", function(done) {
  server.reload();
  done()
})

gulp.task("clean", function() {
  return del("build")
})

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/less/**/*.less", gulp.series("css"));
  gulp.watch("source/*.html", gulp.series("build", "refresh"));
});

gulp.task("images", gulp.series("imagemin", "webp"));
gulp.task("build", gulp.series("clean","copy", "css", "sprite"));
gulp.task("start", gulp.series("build", "server"));
