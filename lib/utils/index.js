'use strict';

// Some modules
var Shortid = require('shortid');
var Uuid = require('node-uuid');

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


// Set of random key generators
utils.keyGen = {};

// Generate a random character made of selected characters
// @params none
// @returns a string of shortid random characters
utils.keyGen.shortid = function () {

    // Select characters we want
    Shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@$');

    var shortid = Shortid.generate();
    return shortid;
};

// Generate uuid v4
// @params none
// @returns a uuid v4
utils.keyGen.uuid = function (){

    return Uuid.v4();
};

module.exports = utils;
