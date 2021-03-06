'use strict';
const Resources = require('./index');

const home = new Resources.resource({
    name: 'home',
    endpoint: '/{version?}'
});

// Resource methods

// Routes configurations
const getIndex = new Resources.route({
    method: 'GET',
    path: home.endpoint
});

// Black listing this endpoint to only authenticated clients.
// They should have required scope access level.
const postIndex = {
    method: 'POST',
    path: getIndex.route.path,
    config: {
        auth: {
            strategy: 'default',
            scope: ['test']
        },
        handler: (request, reply) => {

            reply({ hello: 'posted into v0' });
        }
    }
};

// Add routes to resource routes
home.routes.push(getIndex.route);
home.routes.push(postIndex);

// Routes are exports here because we expect they have been modified by user
exports.routes = home.routes;
