let Router = require('koa-router');
let request = require('request-promise');

module.exports = (app) => {

    const router = new Router();

    router.get('/api/values', async (ctx) => {

        ctx.response.body = {
            version: app.conf.version,
            environment: app.conf.environment
        };

    });

    app.use(router.routes());

}