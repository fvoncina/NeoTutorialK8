let glob = require('glob');
let Router = require('koa-router');
let fs = require('fs');
let path = require('path');
let _ = require('lodash');


exports = module.exports = function initModules(app, folder) {

    const walkSync = (dir, filelist = []) => {
        fs.readdirSync(dir).forEach(file => {
            filelist = fs.statSync(path.join(dir, file)).isDirectory()
                ? walkSync(path.join(dir, file), filelist)
                : filelist.concat(path.join(dir, file));
        });
        return filelist;
    };

    let list = walkSync(folder);

    console.log(`Loading routes base on ${folder}`);

    _(list).forEach((f) => {
        if (path.extname(f) === '.js') {
            console.log(`\tAdding ${f}`);
            require(f)(app);
        }
    });

};
