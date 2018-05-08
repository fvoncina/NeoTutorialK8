const _ = require('lodash');
const Koa = require('koa');
const mount = require('koa-mount');
const views = require('koa-views');
const config = require('./helpers/config')();
const path = require('path');
const koaRoutesLoader = require('./helpers/koa-router-loader');

const app = new Koa();
app.proxy = true;
global.conf = app.conf = config;
global.baseDir = app.baseDir = __dirname;

app.use(views(path.join(app.baseDir, 'templates'), {
    extension: 'ect',
    options: {
        open: '{{',
        close: '}}',
        watch: true,
        root: path.join(app.baseDir, 'templates'),
        keepSpaces: true
    }
}));

koaRoutesLoader(app, path.join(global.baseDir, 'routes'));

let port = process.env.PORT || 5001;

app.listen(port, () => {
    console.log(`FrontEnd Listening HTTP on ${port} | ${conf.environment}`);
});
