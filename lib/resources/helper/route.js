'use strict';
// Defines the route object
// Adds some methods

// Load modules
var Joi = require('joi');

// Internals
var internals = {};

// Schema for route object
internals.routeSchema = Joi.object().keys({
    id: Joi.string().alphanum(),
    method: Joi.string(),
    // methods: Joi.array().items(Joi.string().valid('GET', 'POST', 'DELETE', 'PUT')).unique(),
    handler: Joi.any().required(),
    path: Joi.string().required(),
    description: Joi.string()
})// .without('method', 'methods')
;

// route object
// @params object with id - string, path - string, method - string or methods - array of strings, handler - function (request, reply)

internals.route = function (routeObject){

    var object = routeObject || {};

    // Validate the route object parameters
    Joi.validate(object, internals.routeSchema, function (err, value){

        if (err) {
            throw err;
        }
        object = value;
    });

    // Id
    var id = object.id;
    var description = object.description;
    var path  = object.path;
    var method = object.method;
    var handler = object.handler;

    // Make setters and getters for each ?

    // Eventually make a route
    this.route = {
        method: method,
        path: path,
        config: {
            id: id,
            description: description,
            handler: handler
        }
    };
};


// Exports
exports.route = internals.route;
