'use strict';
var resource = require('./index').resource;

var home = new resource({
    name: 'home',
    endpoint: '/'
});

// Resource methods

// Routes configurations
home.routes.push({
    method: 'GET',
    path: home.endpoint,
    config: {
        description: 'Returns the index of the app',
        handler: function (request, reply) {

            return reply({ 'Hello': 'Api' });
        }
    }
});

// Exports
exports.routes = home.routes;
