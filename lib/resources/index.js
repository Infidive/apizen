'use strict';

// Load modules
var Hoek = require('hoek');
var Joi = require('joi');
var Path = require('path');
var _ = require('lodash');
var Route = require('./helper/route');

// Internals
var internals = {};

// Methods
internals.methods = {};

// Schema for validating resource objects
internals.resourceSchema = Joi.object().keys({
    name: Joi.string().alphanum().required(),
    endpoint: Joi.string().required()
});

// Resource object
internals.resource = function (resourceObject){

    var object = resourceObject || {};

    // Validate the resource object parameters
    Joi.validate(object, internals.resourceSchema, function (err, value){

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
var files = require('../utils').lsdir(Path.join(__dirname),'index.js');

// Add routes to the server
files.forEach(function (file) {

    Hoek.merge(exports.routes, require(Path.join(__dirname,file)).routes);
});
