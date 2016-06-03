'use strict';

// Load modules
const Hoek = require('hoek');
const Server = require('./index');
const Composer = require('./manifest');

// Internals
const internals = {};

// Server init
Server.init(Composer.manifest, Composer.composeOptions, (err, server) => {

    Hoek.assert(!err, err);

    // Server connections
    const api = server.select('api');

    // Console log where the server is running
    console.log('Api is running at: ', api.info.uri);

});

