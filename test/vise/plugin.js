'use strict';


exports.register = function (server, options, next) {

    next();
};

exports.register.attributes = {
    name: 'test',
    version: '0.0.1'
};
