let Router = require('koa-router');
let request = require('request-promise');

module.exports = (app) => {

    const router = new Router();

    router.get('/api/values', async (ctx) => {

        console.log('backend');

        ctx.response.body = {
            version: app.conf.version,
            environment: app.conf.environment
        };

    });

    app.use(router.routes());

}