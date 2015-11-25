'use strict';
var Resources = require('./index');
var _ = require('lodash');

var home = new Resources.resource({
    name: 'home',
    endpoint: '/{version?}'
});

// Resource methods

// Routes configurations
var getIndex = new Resources.route({
    method: 'GET',
    path: home.endpoint,
    id: 'getIndex',
    description: 'Returns and index of api',
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
});

var postIndex = new Resources.route({
    method: 'POST',
    path: getIndex.route.path,
    id: 'postIndex',
    description: 'Post to an index of api',
    handler: {

        versioned: {
            'v0': function (request, reply) {

                return reply({ hello: 'version 0' });
            }
        }
    }
});

// Add routes to resource routes
home.routes.push(getIndex.route);
home.routes.push(postIndex.route);

// Routes are exports here because we expect they have been modified by user
exports.routes = home.routes;
