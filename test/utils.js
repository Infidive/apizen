'use strict';

// Load modules
var Code = require('code');
var Lab = require('lab');
var Path = require('path');
var Utils = require('../lib/utils');
var Shortid = require('shortid');
var Wagner = require('wagner-core');

// Test shortcuts
var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

describe('utils - utils/index', function () {

    it('Checks if lsdir returns array of only wanted files', function (done) {

        var files = Utils.lsdir(Path.join(__dirname),'utils.js');

        expect(files).to.be.array();
        expect(files).not.to.contain('utils.js');
        expect(files).not.to.contain('.foo.js');
        expect(files).not.to.contain('utils.js~');
        done();

    });

    it('Checks keyGen', function (done) {

        var uuidv4format = /[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/i;

        var shortid = null;
        var uuid = null;

        Wagner.task('generateIds', function (callback){

            shortid = Utils.keyGen.shortid();
            uuid = Utils.keyGen.uuid();
            var error = null;

            if (!shortid || !uuid) {
                error = new Error('Couln\'t generate a key');
            }

            callback(error, 'generated');
        });

        Wagner.invokeAsync(function (error, generateIds) {

            expect(error).not.to.exist();
            expect(Shortid.isValid(shortid), 'An instance of shortid').to.be.true();
            expect(uuid).match(uuidv4format);
            done();
        });
    });

});
