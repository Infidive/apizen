'use strict';

// Load modules

// Internals
var internals = {};

// Config for monitor
internals.monitor = {
    opsInterval: 1000,
    reporters: [{
        reporter: require('good-console'),
        events: { log: '*', response: '*' }
    }, {
        reporter: require('good-file'),
        events: { ops: '*' },
        config: './logs/monitor_log'
    }]
};

// Composer
var composer = module.exports = {};

composer.manifest = {

    connections: [
        {
            host: process.env.HOST || 'localhost',
            port: process.env.PORT || 6874,
            labels: ['api'],
            router: {
                'isCaseSensitive': false,
                'stripTrailingSlash': true
            }
        }
    ],
    plugins: {
        'good': internals.monitor,
        'consistency': {
            uriParam: 'version',
            acceptNamespace: 'apizen',
            customHeaderKey: 'api-version'
        },
        'hapi-auth-hawk': {},
        './auth': {}
    }
};

composer.composeOptions = {
    relativeTo: __dirname
};
