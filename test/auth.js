'use strict';

// Load modules
var Hapi = require('hapi');
var Code = require('code');
var Lab = require('lab');
var App = require('./vise');
var Hawk = require('hawk');
var Hoek = require('hoek');

// Test shortcuts
var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

// Test server
var server;

// Test client credentials
var clientBadCredentials = {
    id: 'test',
    key: 'B23A3C8Aajfmalnflanflapnflnaflnaljflajfljaf',
    algorithm: 'sha256'
};

// Test function
var testurk = function (request, clientCreds, responseCode, helloVersion) {

    var head = {
        headers:{
            authorization: server.methods.authHeader({ path: '/', method: 'POST' }).field
        }
    };

    Hoek.merge(request, head);

    server.inject(request, function (res) {

        var payload = JSON.parse(res.payload);
        expect(res.statusCode, 'Status code').to.equal(responseCode);

        // Success requests
        if (res.statusCode === 200) {
            expect(payload.hello).to.equal(helloVersion);
        }

        // Unathorized request
        if (res.statusCode === 401) {
            expect(payload).to.contain('error');
            expect(payload.error).to.contain('Unauthorized');
        }

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

    it('POST accessing endpoint without auth, should get unauthorized response', function (done) {

        done(testurk({ method: 'POST', url: '/v0' }, clientBadCredentials, 401, 'version 0'));
    });

    // Good credentials
    it('POST - accessing endpoint with correct credentials, should get good response', function (done) {

        done(testurk({ method: 'POST', url: '/' }, null, 200, 'posted into v0'));
    });

    // After all tests
    // Stop the server
    lab.after(function (done) {

        server.stop(done);
    });
});
