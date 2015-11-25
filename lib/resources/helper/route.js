'use strict';
// Defines the route object
// Adds some methods

// Load modules
var Joi = require('joi');

// Internals
var internals = {};

// Schema for route object
internals.routeSchema = Joi.object().keys({
    method: Joi.string(),
    path: Joi.string().required()
});

// route object generatesw a placeholder route
// @params object path - string, method - string

internals.route = function (routeObject){

    var object = routeObject || {};

    // Validate the route object parameters
    Joi.validate(object, internals.routeSchema, function (err, value){

        if (err) {
            throw err;
        }
        object = value;
    });

    var path  = object.path;
    var method = object.method;

    // Make setters and getters for each ?

    // Eventually make a route
    this.route = {
        method: method,
        path: path,
        config: {
            description: 'Placeholder for ' + path,
            handler: {
                versioned: {
                    'v0': function (request, reply) {

                        return reply({ hello: 'version 0' });
                    }
                }
            }
        }
    };
};


// Exports
exports.route = internals.route;
