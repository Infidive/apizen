'use strict';

// Load modules
var Hapi = require('hapi');
var Code = require('code');
var Lab = require('lab');

// Test shortcuts
var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

// Tesing the index
describe('resources /index', function () {

    it('Throw error when attempt to create an invalid resource', function (done) {

        var resource = require('../lib/resources/').resource;

        try {
            var testresource = new resource();
        } catch (error){

            expect(error).to.exist();
            expect(error.name).to.equal('ValidationError');
        }

        expect(testresource).not.to.exist();
        done();

    });
});

