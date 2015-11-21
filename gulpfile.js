'use strict';

var Gulp = require('gulp');
var Exec = require('child_process').exec;

// Run tests
Gulp.task('test', function (callback) {

    Exec('npm test', function (error, stdout, stderr) {

        console.log(stdout);
        console.log(stderr);
        callback();
    });
});

// Run installs
Gulp.task('modules', function (callback) {

    Exec('npm install', function (error, stdout, stderr){

        console.log(stdout);
        console.log(stderr);
        callback(error);
    });
});

// Watch changes
Gulp.task('watch', ['modules', 'test'], function () {

    // If files changes run test coverages
    Gulp.watch(['lib/**/*.js', 'test/**/**/*.js'], ['test']);

    // If package.json changes install packages
    Gulp.watch(['package.json'], ['modules', 'test']);
});
