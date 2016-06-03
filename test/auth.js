'use strict';

// Load modules
const Code = require('code');
const Lab = require('lab');
const App = require('./vise');
const Hoek = require('hoek');

// Test shortcuts
const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const expect = Code.expect;
const it = lab.test;

// Test server
let server;

// Test client credentials
const clientBadCredentials = {
    id: 'test',
    key: 'B23A3C8Aajfmalnflanflapnflnaflnaljflajfljaf',
    algorithm: 'sha256'
};

// Test function
const testurk = (request, clientCreds, responseCode, helloVersion) => {

    const head = {
        headers:{
            authorization: server.methods.authHeader({ path: '/', method: 'POST' }).field
        }
    };

    Hoek.merge(request, head);

    server.inject(request, (res) => {

        const payload = JSON.parse(res.payload);
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
describe('routes /index', () => {

    // Start the server before any test
    lab.before((done) => {

        App.init((err, apiServer) => {

            expect(err).to.not.exist();
            server = apiServer;
            done();
        });
    });

    it('POST accessing endpoint without auth, should get unauthorized response', (done) => {

        done(testurk({ method: 'POST', url: '/v0' }, clientBadCredentials, 401, 'version 0'));
    });

    // Good credentials
    it('POST - accessing endpoint with correct credentials, should get good response', (done) => {

        done(testurk({ method: 'POST', url: '/' }, null, 200, 'posted into v0'));
    });

    // After all tests
    // Stop the server
    lab.after((done) => {

        server.stop(done);
    });
});
