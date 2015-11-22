'use strict';
var resource = require('./index').resource;

var home = new resource({
    name: 'home',
    endpoint: '/{version?}'
});

// Resource methods

// Routes configurations
home.routes.push({
    method: 'GET',
    path: home.endpoint,
    config: {
        id: 'index',
        description: 'Returns the index of the api',
        handler: {

            versioned: {
                'v0': function (request, reply) {

                    return reply({ hello: 'version 0' });
                },
                'v1': function (request, reply) {

                    return reply({ hello: 'version 1' });
                }
            }
        }
    }
});

// Exports
exports.routes = home.routes;
