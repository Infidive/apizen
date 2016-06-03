'use strict';
// Defines the route object
// Adds some methods

// Load modules
const Joi = require('joi');

// Internals
const internals = {};

// Schema for route object
internals.routeSchema = Joi.object().keys({
    method: Joi.string(),
    path: Joi.string().required()
});

// route object generatesw a placeholder route
// @params object path - string, method - string

internals.route = function (routeObject){

    let object = routeObject || {};

    // Validate the route object parameters
    Joi.validate(object, internals.routeSchema, (err, value) => {

        if (err) {
            throw err;
        }
        object = value;
    });

    const path  = object.path;
    const method = object.method;

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
