'use strict';

// Load modules
const Code = require('code');
const Lab = require('lab');
const Route = require('../../../lib/resources').route;

// Test shortcuts
const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const expect = Code.expect;
const it = lab.test;

// Tesing the index
describe('resources /helper/route', () => {

    it('Throw error when attempt to create an invalid route', (done) => {

        let testroute;
        try {

            // This should never be called
            testroute = new Route();
        }
        catch (error){

            expect(error).to.exist();
            expect(error.name).to.equal('ValidationError');
        }

        expect(testroute).not.to.exist();
        done();
    });
});
