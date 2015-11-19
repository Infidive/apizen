'use strict';

var gulp = require('gulp');
var exec = require('child_process').exec;

// Run tests
gulp.task('test', function (callback) {

    exec('npm test', function (error, stdout, stderr) {

        console.log(stdout);
        console.log(stderr);
        callback(error);
    });
});

// Run installs
gulp.task('modules', function (callback) {

    exec('npm install', function (error, stdout, stderr){

        console.log(stdout);
        console.log(stderr);
        callback(error);
    });
});

// Watch changes
gulp.task('watch', function () {

    // If files changes run test coverages
    gulp.watch(['lib/**/*.js', 'test/**/*.js'], ['test']);

    // If package.json changes install packages
    gulp.watch(['package.json'], ['modules']);
});
