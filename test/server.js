'use strict';

// Load modules
const Code = require('code');
const Lab = require('lab');
const App = require('./vise');
const Plugin = require('./vise/plugin');

// Test shortcuts
const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const expect = Code.expect;
const it = lab.test;

describe('server', () => {

    it('starts server and returns hapi server object', (done) => {

        App.init( (err, server) => {

            expect(err).to.not.exist();
            expect(typeof (server)).to.be.equal(typeof (require('hapi')));

            server.stop(done);
        });
    });

    it('starts server with error, it should stop', (done) => {

        const orig = Plugin.register;
        Plugin.register = (server, options, next) => {

            Plugin.register = orig;
            return next(new Error('register plugin failed'));
        };

        Plugin.register.attributes = {
            name: 'faulty plugin'
        };

        App.init( (err, server) => {

            expect(err).to.exist();
            expect(err.message).to.equal('register plugin failed');

            done();
        });
    });
});
