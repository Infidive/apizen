'use strict';

// Module dependentants
var App = require('../../lib');
var Hawk = require('hawk');

// Declare internals
var internals = {};

// Test client credentials
internals.clientCredentials = {
    id: 'test-BB000E8E9517',
    key: 'B23A3C8A951611E5A2F743ADD2576E7F',
    algorithm: 'sha256'
};

// Server methods
internals.methods = {};

// computes MAC header used to authenticate client
// @public
// @params requestDetails - object with path and method.
internals.methods.generateAuthHeader = function (requestDetails, clientCredentials) {

    var clientCreds = clientCredentials || internals.clientCredentials;

    return Hawk.client.header(this.info.uri + requestDetails.path, requestDetails.method, { credentials: clientCreds });
};

// Manifest for the test server
// @private
internals.manifest = {
    connections: [{
        host: 'localhost',
        port: 0,
        labels: ['test'],
        router: {
            'isCaseSensitive': false,
            'stripTrailingSlash': true
        }
    }],
    plugins: {
        './plugin': {},
        'good': {
            opsInterval: 1000,
            reporters: [{
                reporter: require('good-console'),
                events: {
                    error: '*',
                    log: '*',
                    response: '*',
                    request: '*'
                }
            }]
        },
        'consistency': {
            uriParam: 'version',
            acceptNamespace: 'apizen',
            customHeaderKey: 'api-version'
        },
        'hapi-auth-hawk': {},
        '../../lib/auth': {}
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

        // If error stop here
        if (err) {
            return next(err);
        }

	// Adding some methods
        server.method('authHeader', internals.methods.generateAuthHeader, { bind: server });

	// Returning a server
        return next(err, server);
    });
};

// Exports
exports.init = internals.init;
