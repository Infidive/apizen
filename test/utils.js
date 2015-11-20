'use strict';

// Load modules
var Code = require('code');
var Lab = require('lab');
var Path = require('path');

// Test shortcuts
var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

describe('utils - utils/index', function () {

    it('Checks if lsdir returns array of ony wanted files', function (done) {

        var files = require('../lib/utils').lsdir(Path.join(__dirname),'utils.js');

        expect(files).to.be.array();
        expect(files).not.to.contain('utils.js');
        expect(files).not.to.contain('.foo.js');
        expect(files).not.to.contain('utils.js~');
        done();

    });
});
