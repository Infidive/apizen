'use strict';

// Load modules
var Hapi = require('hapi');
var Code = require('code');
var Lab = require('lab');
var Route = require('../../../lib/resources').route;

// Test shortcuts
var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

// Tesing the index
describe('resources /helper/route', function () {

    it('Throw error when attempt to create an invalid route', function (done) {

        try {
            var testroute = new Route();
        } catch (error){

            expect(error).to.exist();
            expect(error.name).to.equal('ValidationError');
        }

        expect(testroute).not.to.exist();
        done();
    });
});
