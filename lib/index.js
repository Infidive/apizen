'use strict';

// Load modules
const Glue = require('glue');

// Declare internals
const internals = {};

exports.init = function (manifest, composeOptions, next) {

    Glue.compose(manifest, composeOptions, (err, server) => {

        // If there is error in composing
        if (err) {
            return next(err);
        }

        // Adding resource routes to the server
        server.route(require('./resources').routes);

        server.start((err) => {

            return next(err, server);
        });
    });
};
