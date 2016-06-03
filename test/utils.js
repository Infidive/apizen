'use strict';

// Load modules
const Code = require('code');
const Lab = require('lab');
const Path = require('path');
const Utils = require('../lib/utils');

// Test shortcuts
const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const expect = Code.expect;
const it = lab.test;

describe('utils - utils/index', () => {

    it('Checks if lsdir returns array of only wanted files', (done) => {

        const files = Utils.lsdir(Path.join(__dirname),'utils.js');

        expect(files).to.be.array();
        expect(files).not.to.contain('utils.js');
        expect(files).not.to.contain('.foo.js');
        expect(files).not.to.contain('utils.js~');
        done();
    });
});
