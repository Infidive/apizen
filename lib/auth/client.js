'use strict';

// Simulate client model for now.

// Load modules

// This should be in the databse somewhere
var clients = {
    'test-BB000E8E9517': {
        id: 'test-BB000E8E9517',
        key: 'B23A3C8A951611E5A2F743ADD2576E7F',
        algorithm: 'sha256',
        scope: 'test'
    }
};

// Internals
var internals = {};

// Saving client
internals.save = function (){};

// Finding a client
internals.find = function (){};

// Finding one
internals.findOne = function (id, callback){

    if (clients[id]) {
        return callback(clients[id].err, clients[id]);
    }
    return callback(null, null);
};

// Creating client
internals.init = function (){};

// Removing client
internals.remove = function (){};

// Exports
exports = module.exports = internals;
