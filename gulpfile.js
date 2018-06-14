var gulp = require("gulp"),
    sass = require("gulp-sass"),
    sourcemaps = require("gulp-sourcemaps"),
    autoprefixer = require("gulp-autoprefixer"),
    sassdoc = require("sassdoc"),
    rename = require("gulp-rename"),
    connect = require("gulp-connect"),
    // gulp doesnt try to compile the partials except as indicted by the @import statements
    htmlSources = ["*.html"],
    jsSources = ["*.js"],
    sassInput = "./styles/*.scss",
    cssOutput = "./assets/",
    sassOptions = {
        errLogToConsole: true,
        outputStyle: "expanded"
    };

gulp.task("sass", function() {
    gulp.src(sassInput)
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions).on("error", sass.logError))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer({ browsers: "> 1%, since 2013" }))
        .pipe(rename("css-builtBySass.css"))
        .pipe(gulp.dest(cssOutput))
        .pipe(connect.reload())
        .resume();
});

gulp.task("sassdoc", function() {
    gulp.src(sassInput)
        .pipe(sassdoc())
        .resume();
});

gulp.task("watch", function() {
    gulp
        //watch input folder for change and then run 'sass' task
        .watch(sassInput, ["sass"])
        .on("change", function(e) {
            console.log(
                "file" + e.path + " was " + e.type + ", running tasks..."
            );
        });
    gulp.watch(htmlSources, ["html"]);
    gulp.watch(jsSources, ["javascript"]);
});

gulp.task("html", function() {
    gulp.src(htmlSources).pipe(connect.reload());
});

gulp.task("javascript", function() {
    gulp.src(jsSources).pipe(connect.reload());
});

gulp.task("prod", ["sassdoc"], function() {
    gulp.src(sassInput)
        .pipe(sass({ outputStyle: "compressed" }))
        .pipe(autoprefixer())
        .pipe(gulp.dest(cssOutput));
});

gulp.task("connect", function() {
    connect.server({
        root: ".",
        livereload: true
    });
});

gulp.task("default", ["sass", "watch", "connect" /*, possible other tasks */]);
