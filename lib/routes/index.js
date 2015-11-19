'use strict';

// Load modules

// Internals
var internals = {};

// Register a simple route
internals.index = function (server) {

    // routes
    server.route({
        method: 'GET',
        path: '/',
        config: {
            description: 'Returns the index of the app',
            handler: function (request, reply) {

                return reply({ 'Hello': 'Api' });
            }
        }
    });
};


// Export plugin
exports.register = function (server, options, next) {

    // Register simple route
    internals.index(server, next);

    // Go to next
    return next();
};

// Plugin attributes
exports.register.attributes = {
    name: 'routes'
};
