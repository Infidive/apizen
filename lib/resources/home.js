'use strict';
var resourceObject = require('./index').resource;

var resource = new resourceObject({
    name: 'index',
    endpoint: '/'
});

// Resource methods

// Routes configurations
resource.routes.push({
    method: 'GET',
    path: resource.endpoint,
    config: {
        description: 'Returns the index of the app',
        handler: function (request, reply) {

            return reply({ 'Hello': 'Api' });
        }
    }
});

// Exports
exports.routes = resource.routes;
