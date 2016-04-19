var gulp = require('gulp');
var less = require('gulp-less');
//var concat = require('gulp-concat');
var include = require("gulp-include");
var install = require("gulp-install");

var path = require('path');

var dirs = {
    clientbuild: "./build/public",
    clientsrc: "./src/client",
    serverbuild: "./build",
    serversrc: "./src/server"
};

gulp.task('default', ['server', 'client']);

/*Build server*/
gulp.task('server', ['copy_server' ,'install_npm']);

gulp.task('copy_server',function(){
    return gulp.src(dirs.serversrc+'/**/*')
        .pipe(gulp.dest(dirs.serverbuild+'/'));
});

gulp.task('install_npm',function(){
    gulp.src([dirs.serverbuild+'/package.json']).pipe(install());
});

//use this to automagically re-build on file change
gulp.task('watchserver', function() {
    gulp.watch(dirs.serversrc+'/**/*', ['copy_server']);
});

/*Build client*/
gulp.task('client', ['js', 'less', 'html', 'static']);
//concatenate all js files into one
gulp.task('js', function(){
    return gulp.src(dirs.clientsrc+'/js/App.js')
        .pipe(include())
            .on('error', console.log)
        .pipe(gulp.dest(dirs.clientbuild+'/js'));
});

//compile Less files to Css
gulp.task('less', function () {
    return gulp.src(dirs.clientsrc+'/style/style.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest(dirs.clientbuild+'/style'));
});

//simply copy html and static files
gulp.task('html', function(){
    return gulp.src(dirs.clientsrc+'/*.html')
        .pipe(gulp.dest(dirs.clientbuild+'/'));
});

gulp.task('static', function(){
    return gulp.src(dirs.clientsrc+'/static/*')
        .pipe(gulp.dest(dirs.clientbuild+'/static'));
});

//use this to automagically re-build on file change
gulp.task('watchclient', function() {
    gulp.watch('./src/**/*', ['default']);
});
