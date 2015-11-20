'use strict';

// Load modules

var Hapi = require('hapi');
var Code = require('code');
var Lab = require('lab');
var App = require('./../vise');

// Test shortcuts
var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

// Testing routes.js
describe('/resources/index', function () {

    it('returns an index page of the app', function (done) {

        App.init(function (err, server) {

            expect(err).to.not.exist();

            var request = { method: 'GET', url: '/' };

            server.inject(request, function (res) {

                expect(res.statusCode, 'Status code').to.equal(200);
                expect(res.payload).to.contain('Hello');

                server.stop(done);
            });
        });
    });
});
