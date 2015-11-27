'use strict';

// some utils
var utils = {};

// Get the content the js files in a directory execpt basefile
// Runs synchronously, so no callbacks. Could it hamper speed?
// @params Path directory, string basefile.js
// @returns all .js files except basefile - should find
utils.lsdir = function (directory, basefile){

    return require('fs').readdirSync(directory).filter(function (file) {

        return (file !== basefile && file.slice(-3) === '.js') && file.slice(0,1) !== '.';
    });
};

// Exports
module.exports = utils;
