'use strict';

// Load modules

var Hapi = require('hapi');
var Code = require('code');
var Lab = require('lab');
var App = require('../../lib');
var Path = require('path');

//declare internals
var internals = {};

// Test shortcuts
var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

// Testing routes.js
describe('/resources/index', function () {

    it('returns an index page of the app', function (done) {

        App.init(internals.manifest, internals.composeOptions, function (err, server) {

            expect(err).to.not.exist();

            var request = { method: 'GET', url: '/' };

            server.inject(request, function (res) {

                expect(res.statusCode, 'Status code').to.equal(200);
                expect(res.payload).to.contain('Hello');

                server.stop(done);
            });
        });
    });
});


internals.manifest = {
    connections: [
        {
            host: 'localhost',
            port: 0
        }],
    plugins: {
        './resources': {}
    }
};

internals.composeOptions = {
    relativeTo: Path.resolve(__dirname, '../../lib')
};
