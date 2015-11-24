'use strict';
var resource = require('./index').resource;

var home = new resource({
    name: 'home',
    endpoint: '/{version?}',
    genroutes: true
});

// Resource methods

// Routes configurations
// How to access routes configurations from home.routes array?


// Routes are exports here because we expect they have been modified by user
exports.routes = home.routes;
