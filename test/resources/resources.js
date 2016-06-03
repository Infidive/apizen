'use strict';

// Load modules
const Code = require('code');
const Lab = require('lab');
const Resource = require('../../lib/resources').resource;

// Test shortcuts
const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const expect = Code.expect;
const it = lab.test;

// Tesing the index
describe('resources /index', () => {

    it('Throw error when attempt to create an invalid resource', (done) => {

        let testresource;

        try {

            // This should never be called
            testresource = new Resource();
        }
        catch (error){

            expect(error).to.exist();
            expect(error.name).to.equal('ValidationError');
        }

        expect(testresource).not.to.exist();
        done();
    });

    it('Checks that resource does not generate routes by default', (done) => {

        const testresource = new Resource({
            name: 'foo',
            endpoint: '/foo'
        });

        expect(testresource).to.exist();
        expect(testresource.routes).to.be.array();
        expect(testresource.routes.length).to.equal(0);
        done();
    });
});
