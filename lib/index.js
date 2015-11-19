'use strict';

// Load modules
var Glue = require('glue');

// Declare internals
var internals = {};

exports.init = function (manifest, composeOptions, next) {

    Glue.compose(manifest, composeOptions, function (err, server) {

        // If there is error in composing
        if (err) {
            return next(err);
        }

        server.start(function (err) {

            return next(err, server);
        });
    });
};
