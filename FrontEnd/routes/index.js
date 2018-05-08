let Router = require('koa-router');
let request = require('request-promise');

module.exports = (app) => {

    const router = new Router();

    router.get('/', async (ctx) => {

        const backendUrl = `${app.conf.backend_url}/api/values`;

        let backendResponse = {};

        try {
            const backendResponseString = await request({
                uri: backendUrl,
                method: 'GET'
            });
            backendResponse = JSON.parse(backendResponseString);
        } catch (e) {
            backendResponse.error = e.message;
        }


        const model = {
            frontend: {
                version: app.conf.version,
                environment: app.conf.environment
            }, backend: {
                url: app.conf.backend_url,
                error: backendResponse.error,
                version: backendResponse.version,
                environment: backendResponse.environment
            }
        };
        await ctx.render('index.ect', model);
    });

    app.use(router.routes());

}