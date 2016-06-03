'use strict';

// Load modules
const Code = require('code');
const Lab = require('lab');
const App = require('./../vise');

// Test shortcuts
const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const expect = Code.expect;
const it = lab.test;

// Test server
let server;

// Test function
const testurk = (test, request, helloVersion) => {

    return it(test, (done) => {

        server.inject(request, (res) => {

            const payload = JSON.parse(res.payload);
            expect(res.statusCode, 'Status code').to.equal(200);
            expect(payload.hello).to.equal(helloVersion);
        });

        done();
    });
};

// Testing routes.js
describe('routes /index', () => {

    // Start the server before any test
    lab.before((done) => {

        App.init((err, apiServer) => {

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
    lab.after((done) => {

        server.stop(done);
    });
});
