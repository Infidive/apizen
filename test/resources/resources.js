'use strict';

// Load modules
var Hapi = require('hapi');
var Code = require('code');
var Lab = require('lab');
var Resource = require('../../lib/resources').resource;

// Test shortcuts
var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

// Tesing the index
describe('resources /index', function () {

    it('Throw error when attempt to create an invalid resource', function (done) {

        try {
            var testresource = new Resource();
        } catch (error){

            expect(error).to.exist();
            expect(error.name).to.equal('ValidationError');
        }

        expect(testresource).not.to.exist();
        done();
    });

    it('Checks that resource does not generate routes by default', function (done) {

        var testresource = new Resource({
            name: 'foo',
            endpoint: '/foo'
        });

        expect(testresource).to.exist();
        expect(testresource.routes).to.be.array();
        expect(testresource.routes.length).to.equal(0);
        done();
    });
});
