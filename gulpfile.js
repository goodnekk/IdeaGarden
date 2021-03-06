var gulp = require('gulp');
var less = require('gulp-less');
var include = require("gulp-include");
var install = require("gulp-install");
var sequence = require("gulp-sequence");
var gp_concat = require('gulp-concat'),
  gp_rename = require('gulp-rename'),
  gp_uglify = require('gulp-uglify');
var spawn = require('child_process').spawn;
var path = require('path');

var node; //this stores the node instance

//build and source directories
var dirs = {
    clientbuild: "build/public",
    clientsrc: "src/client",
    serverbuild: "build",
    serversrc: "src/server"
};

/* High level tasks */
gulp.task('default', ['run']);

gulp.task('build', ['client', 'server']);

gulp.task('install_npm',function(){
    return gulp.src([dirs.serverbuild+'/package.json'])
        .pipe(install());
});

//automagically re-build and run
gulp.task('develop', function() {
    gulp.start('run');
    gulp.watch(dirs.serversrc+'/**/*', ['server', 'run']);
    gulp.watch(dirs.clientsrc+'/**/*', ['client']);
});


/* Node.js */
//run node, if it's already running
gulp.task('run', function() {

    process.chdir(dirs.serverbuild);
    if (node) node.kill();
    node = spawn('node', [ 'index.js'], {stdio: 'inherit'});
    node.on('close', function (code) {
        if (code === 8) {
            gulp.log('Error detected, waiting for changes...');
        }
    });
    process.chdir(__dirname);
});

//kill node on exit
process.on('exit', function() {
    if (node) node.kill();
});


/* Build server */
gulp.task('server',function(){
    return gulp.src(dirs.serversrc+'/**/*')
        .pipe(gulp.dest(dirs.serverbuild+'/'));
});

/* Build client */
gulp.task('client', ['js', 'i18next', 'less', 'html', 'static']);

//concatenate all js files into one

gulp.task('js', function(){
  return gulp.src(dirs.clientsrc+'/js/App.js')
    .pipe(include())
    //.pipe(gp_sourcemaps.init())
    .pipe(gp_concat('App.js'))
    .pipe(gulp.dest(dirs.clientbuild+'/js'))
    .pipe(gp_rename('App.min.js'))
    .pipe(gp_uglify())
    //.pipe(gp_sourcemaps.write('./'))
    .pipe(gulp.dest(dirs.clientbuild+'/js'));
});

gulp.task('i18next', function(){
  return gulp.src(dirs.clientsrc+'/lib/*')
      .pipe(gulp.dest(dirs.clientbuild+'/js'));
});

//     return gulp.src(dirs.clientsrc+'/js/App.js')
//         .pipe(include())
//             .on('error', console.log)
//         .pipe(gulp.dest(dirs.clientbuild+'/js'));
// });

//compile Less files to CSS
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
