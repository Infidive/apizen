'use strict';

// Module dependentants
var App = require('../../lib');

// Declare internals
var internals = {};

// Manifest for the test server
// @private
internals.manifest = {
    connections: [{
        host: 'localhost',
        port: 0,
        labels: ['test']
    }],
    plugins: {
        './plugin': {},
        '../../lib/version': {
            uriParams: 'version'
        }
    }
};

// Composing options for test server
// @private
internals.composeOptions = {
    relativeTo: __dirname
};

// Initializing a test server
// @public
internals.init = function (next){

    App.init(internals.manifest, internals.composeOptions, function (err, server) {

        // Return the initialized server or error
        return next(err, server);
    });
};

exports.init = internals.init;
