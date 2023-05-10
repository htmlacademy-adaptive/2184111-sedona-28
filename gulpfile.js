import gulp from "gulp";
import plumber from "gulp-plumber";
import sass from "gulp-dart-sass";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import browser from "browser-sync";
import csso from "postcss-csso";
import rename from "gulp-rename";
import htmlmin from "gulp-htmlmin";
import { deleteAsync } from "del";
import svgstore from "gulp-svgstore";
import svgo from "gulp-svgmin";
import squoosh from "gulp-libsquoosh";
import terser from "gulp-terser";

// Styles

export const styles = () => {
  return gulp
    .src("source/sass/style.scss", { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer(), csso()]))
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css", { sourcemaps: "." }))
    .pipe(browser.stream());
};

//HTML

export const html = () => {
  return gulp
    .src("source/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
};

// Scripts

export const scripts = () => {
  return gulp.src("source/js/*.js").pipe(terser()).pipe(gulp.dest("build/js"));
};

// Images

export const optimizeImages = () => {
  return gulp
    .src("source/img/*.{jpg,png}")
    .pipe(squoosh())
    .pipe(gulp.dest("build/img"));
};

const copyImages = () => {
  return gulp.src("source/img/*.{jpg,png}").pipe(gulp.dest("build/img"));
};

// WebP

export const createWebp = () => {
  return gulp
    .src("source/img/*.{jpg,png}")
    .pipe(squoosh({ webp: {} }))
    .pipe(gulp.dest("build/img"));
};

//svg

export const svg = () => {
  return gulp.src("source/img/*.svg").pipe(svgo()).pipe(gulp.dest("build/img"));
};

// Copy

export const copy = (done) => {
  gulp
    .src(["source/fonts/*.{woff,woff2}", "source/*.ico", "source/*.json"], {
      base: "source",
    })
    .pipe(gulp.dest("build"));
  done();
};

// Clean

export const clean = () => {
  return deleteAsync("build");
};

// Server

function server(done) {
  browser.init({
    server: {
      baseDir: "build",
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Reload

export const reload = (done) => {
  browser.reload();
  done();
};

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series(styles));
  gulp.watch("source/*.html").on("change", browser.reload);
};

export const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel(html, styles, scripts, createWebp, svg)
);

// export default gulp.series(
//   html,
//   styles,
//   scripts,
//   optimizeImages,
//   copyImages,
//   createWebp,
//   svg,
//   copy,
//   server,
//   watcher
// );

exports.default = build;
