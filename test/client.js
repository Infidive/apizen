'use strict';

// Load modules
const Code = require('code');
const Lab = require('lab');
const Client = require('../lib/auth/client');

// Test shortcuts
const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const expect = Code.expect;
const it = lab.test;

describe('Auth - auth/client', () => {

    it('Checks the toy client module returns credentials when called with right credentials', (done) => {

        const testClient = 'test-BB000E8E9517';

        Client.findOne(testClient, (error, client) => {

            expect(error).not.to.exist();
            expect(client).to.exist();
            expect(client).to.contain('key').and.to.contain('scope').and.to.contain('key');
            done();
        });
    });

    it('Checks the toy client module does not returns null when wrong credentials are passed', (done) => {

        const testClient = 'test';

        Client.findOne(testClient, (error, client) => {

            expect(error).not.to.exist();
            expect(client).not.to.exist();
            done();
        });
    });
});
