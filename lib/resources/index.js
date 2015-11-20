'use strict';

// Load modules
var Hoek = require('hoek');

// Resource object
var resource = function (objectParams){

    this.name = objectParams.name;
    this.endpoint = objectParams.endpoint;
    this.routes = [];
    this.methods = [];
};

exports.resource = resource;

// Resource routes
exports.routes = [];

// Routes from available resources
Hoek.merge(exports.routes, require('./home').routes);
