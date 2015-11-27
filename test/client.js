'use strict';

// Load modules
var Code = require('code');
var Lab = require('lab');
var Client = require('../lib/auth/client');

// Test shortcuts
var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

describe('Auth - auth/client', function () {

    it('Checks the toy client module returns credentials when called with right credentials', function (done) {

        var testClient = 'test-BB000E8E9517';

        Client.findOne(testClient, function (error, client) {

            expect(error).not.to.exist();
            expect(client).to.exist();
            expect(client).to.contain('key').and.to.contain('scope').and.to.contain('key');
            done();
        });
    });

    it('Checks the toy client module does not returns null when wrong credentials are passed', function (done) {

        var testClient = 'test';

        Client.findOne(testClient, function (error, client) {

            expect(error).not.to.exist();
            expect(client).not.to.exist();
            done();
        });
    });
});
