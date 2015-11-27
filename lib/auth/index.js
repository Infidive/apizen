'use strict';

// Load modules
var Clients = require('./client');

// internals
var internals = {};

// Authenticating function
internals.authenticate = function (id, callback){

    return Clients.findOne(id, callback);
};

// Register the plugin
exports.register = function (server, options, next) {

    // Register the auth strategy
    server
        .auth
        .strategy('default', 'hawk',
                  { getCredentialsFunc: internals.authenticate });

    next();
};

exports.register.attributes = {
    name: 'apizen-auth',
    version: '0.0.1',
    description: 'Basic authentication with hawk, acts as a wrapper for hapi-auth-hawk'
};
