const _ = require('lodash');
const mout = require('mout');

module.exports = function () {
    const env = process.env.NODE_ENV || 'development';
    const rv = {
        environment: env,
        backend_url: 'http://localhost:5000',
        version: '1.0.0'
    };
    if (mout.object.get(process.env, 'BACKEND_URL')) {
        rv.backend_url = mout.object.get(process.env, 'BACKEND_URL');
    }
    return rv;
};
