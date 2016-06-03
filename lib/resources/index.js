'use strict';

// Load modules
const Hoek = require('hoek');
const Joi = require('joi');
const Path = require('path');
const Route = require('./helper/route');

// Internals
const internals = {};

// Methods
internals.methods = {};

// Schema for validating resource objects
internals.resourceSchema = Joi.object().keys({
    name: Joi.string().alphanum().required(),
    endpoint: Joi.string().required()
});

// Resource object
internals.resource = function (resourceObject){

    let object = resourceObject || {};

    // Validate the resource object parameters
    Joi.validate(object, internals.resourceSchema, (err, value) => {

        if (err) {
            throw err;
        }
        object = value;
    });

    this.name = object.name;
    this.endpoint = object.endpoint;
    this.routes = [];
};

// Exports
exports.resource = internals.resource;
exports.route = Route.route;

// Resource routes
exports.routes = [];

// Get files with resources
const files = require('../utils').lsdir(Path.join(__dirname),'index.js');

// Add routes to the server
files.forEach((file) => {

    Hoek.merge(exports.routes, require(Path.join(__dirname,file)).routes);
});
