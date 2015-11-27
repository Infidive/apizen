'use strict';

// Load modules
var Hapi = require('hapi');
var Code = require('code');
var Lab = require('lab');
var App = require('./../vise');

// Test shortcuts
var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

// Test server
var server;

// Test function
var testurk = function (test, request, helloVersion) {

    return it(test, function (done) {

        server.inject(request, function (res) {

            var payload = JSON.parse(res.payload);
            expect(res.statusCode, 'Status code').to.equal(200);
            expect(payload.hello).to.equal(helloVersion);
        });

        done();
    });
};

// Testing routes.js
describe('routes /index', function () {

    // Start the server before any test
    lab.before(function (done) {

        App.init(function (err, apiServer) {

            expect(err).to.not.exist();
            server = apiServer;
            done();
        });
    });

    // Testing the index route
    testurk('GET the latest index version', { method: 'GET', url: '/' }, 'version 0');
    testurk('GET the version 0 of index', { method: 'GET', url: '/v0' }, 'version 0');

    // After all tests
    // Stop the server
    lab.after(function (done) {

        server.stop(done);
    });
});
