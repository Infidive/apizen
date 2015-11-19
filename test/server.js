'use strict';

// Load modules
var Hapi = require('hapi');
var Code = require('code');
var Lab = require('lab');
var App = require('../lib');
var Routes = require('../lib/routes');
var Path = require('path');

//declare internals

var internals = {};

// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

// Tesing the index

describe('/index', function () {

    it('starts server and returns hapi server object', function (done) {

        App.init(internals.manifest, internals.composeOptions, function (err, server) {

            expect(err).to.not.exist();
            expect(server).to.be.instanceof(Hapi.Server);

            server.stop(done);
        });
    });

    it('starts server with error, it should stop', function (done) {

        var orig = Routes.register;
        Routes.register = function (server, options, next) {

            Routes.register = orig;
            return next(new Error('register plugin failed'));
        };

        Routes.register.attributes = {
            name: 'faulty plugin'
        };

        App.init(internals.manifest, internals.composeOptions, function (err, server) {

            expect(err).to.exist();
            expect(err.message).to.equal('register plugin failed');

            done();
        });
    });
});

internals.manifest = {
    connections: [{
        host: 'localhost',
        port: 0,
        labels: ['api']
    }],
    plugins: {
        './routes': {}
    }
};

internals.composeOptions = {
    relativeTo: Path.resolve(__dirname, '../lib')
};
