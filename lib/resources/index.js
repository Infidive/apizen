'use strict';

// Load modules
var Hoek = require('hoek');
var Joi = require('joi');

// Schema for validating resource objects
var schema = Joi.object().keys({
    name: Joi.string().alphanum().required(),
    endpoint: Joi.string().required()
});

// Resource object
var resource = function (resourceObject){

    var object = resourceObject || {};

    // Validate the resource object parameters
    Joi.validate(object, schema, function (err, value){

        if (err) {
            throw err;
        }
        object = value;
    });

    this.name = object.name;
    this.endpoint = object.endpoint;
    this.routes = [];
    this.methods = [];
};

exports.resource = resource;

// Resource routes
exports.routes = [];

// Routes from available resources
Hoek.merge(exports.routes, require('./home').routes);
