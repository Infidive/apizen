'use strict';

// Load modules
var Hoek = require('hoek');
var Joi = require('joi');
var Path = require('path');
var _ = require('lodash');

// Internals
var internals = {};

// Methods
internals.methods = {};

// Schema for validating resource objects
internals.schema = Joi.object().keys({
    name: Joi.string().alphanum().required(),
    endpoint: Joi.string().required(),
    genroutes: Joi.boolean()
});

// Resource object
internals.resource = function (resourceObject){

    var object = resourceObject || {};

    // Validate the resource object parameters
    Joi.validate(object, internals.schema, function (err, value){

        if (err) {
            throw err;
        }
        object = value;
    });

    this.name = object.name;
    this.endpoint = object.endpoint;
    this.routes = [];
    this.methods = {};

    // If resource is not orphaned
    // generate routes
    if (typeof (object.genroutes) !== 'undefined' && object.genroutes === true){
        internals.generateRoutes(this);
    }

    // getRouteIndex
    // @params routeid eg index_get or index_post, where index is placeholder for resource name
    // return index or -1 for not found
    this.getRouteIndex = function (routeid) {

        return _.findIndex(this.routes, 'config.id', routeid);
    };
};

// Will generate routes
// uri/endpoint/specific
// endpoint route - GET, POST,
// specific route - GET, PUT, DELETE
internals.generateRoutes = function (resource){

    // Generate root endpoint_get
    resource.routes.push({
        method: 'GET',
        path: resource.endpoint,
        config: {
            id: 'index_get_' + resource.name,
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

    // Generate root endpoint_post
    resource.routes.push({
        method: 'POST',
        path: resource.endpoint,
        config: {
            id: 'index_post_' + resource.name,
            description: 'Returns the index of the api',
            handler: {

                versioned: {
                    'v0': function (request, reply) {

                        return reply({ hello: 'version 0' });
                    }
                }
            }
        }
    });

};


// Exports
exports.resource = internals.resource;

// Resource routes
exports.routes = [];

// Get files with resources
var files = require('../utils').lsdir(Path.join(__dirname),'index.js');

// Add routes to the server
files.forEach(function (file) {

    Hoek.merge(exports.routes, require(Path.join(__dirname,file)).routes);
});
