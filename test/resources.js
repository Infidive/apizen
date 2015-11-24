'use strict';

// Load modules
var Hapi = require('hapi');
var Code = require('code');
var Lab = require('lab');
var Resource = require('../lib/resources').resource;
var _ = require('lodash');

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

    it('Checks that resource does not generate routes when no genroutes have been passed', function (done) {

        var testresource = new Resource({
            name: 'foo',
            endpoint: '/foo'
        });

        expect(testresource).to.exist();
        expect(testresource.routes).to.be.array();
        expect(testresource.routes.length).to.equal(0);
        done();
    });

    it('Checks that resource generates routes when genroutes have been passed', function (done) {

        var testresource = new Resource({
            name: 'bar',
            endpoint: 'bar',
            genroutes: true
        });

        expect(testresource).to.exist();
        expect(testresource.routes).to.be.array();
        expect(testresource.routes.length).to.above(0);
        var index = testresource.getRouteIndex('index_get_bar');
        expect(index).to.equal(0); // that is the first route generated
        done();
    });
});
