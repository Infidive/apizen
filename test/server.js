'use strict';

// Load modules
var Code = require('code');
var Lab = require('lab');
var App = require('./vise');
var Plugin = require('./vise/plugin');

// Test shortcuts
var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

describe('server', function () {

    it('starts server and returns hapi server object', function (done) {

        App.init( function (err, server) {

            expect(err).to.not.exist();
            expect(server).to.be.instanceof(require('hapi').Server);

            server.stop(done);
        });
    });

    it('starts server with error, it should stop', function (done) {

        var orig = Plugin.register;
        Plugin.register = function (server, options, next) {

            Plugin.register = orig;
            return next(new Error('register plugin failed'));
        };

        Plugin.register.attributes = {
            name: 'faulty plugin'
        };

        App.init( function (err, server) {

            expect(err).to.exist();
            expect(err.message).to.equal('register plugin failed');

            done();
        });
    });
});
