'use strict';

const Gulp = require('gulp');
const Exec = require('child_process').exec;

// Run tests
Gulp.task('test', (callback) => {

    Exec('npm test', (error, stdout, stderr) => {

        if (error) {
            console.log('Gulp-Task: failed to run tests');
            callback(error);
        }
        console.log(stdout);
        console.log(stderr);
        callback();
    });
});

// Run installs
Gulp.task('modules', (callback) => {

    Exec('npm install', (error, stdout, stderr) => {

        console.log(stdout);
        console.log(stderr);
        callback(error);
    });
});

// Watch changes
Gulp.task('watch', ['modules', 'test'], () => {

    // If files changes run test coverages
    Gulp.watch(['lib/**/*.js', 'test/**/**/*.js'], ['test']);

    // If package.json changes install packages
    Gulp.watch(['package.json'], ['modules']);
});
