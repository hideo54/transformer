const Koa = require('koa');
const app = new Koa();
const route = require('koa-route');
const multer = require('koa-multer');
const fs = require('fs');
const pug = require('pug');
const uglifycss = require('uglifycss');

const returnPNGBuffer = require('./processor').returnPNGBuffer;

app.use(route.post('/download', multer().single('file')));
app.use(async (ctx, next) => {
    if (ctx.path === '/') {
        ctx.status = 200;
        ctx.body = pug.renderFile('index.pug');
    } else if (ctx.path === '/download') {
        if (ctx.method === 'GET') {
            ctx.status = 303;
            ctx.body = '<head><meta http-equiv="refresh" content="0; URL=/" /></head>';
        }
        if (ctx.method === 'POST') {
            const buf = ctx.req.file.buffer;
            const size = { width: Number(ctx.req.body.width), height: Number(ctx.req.body.height) };
            const isTransparent = ctx.req.body.radio === 'transparent' ? true : false;
            const newBuf = await returnPNGBuffer(buf, size, isTransparent);
            fs.writeFileSync(__dirname + '/output.png', newBuf);
            ctx.status = 200;
            ctx.body = pug.renderFile('download.pug');
        }
    } else if (ctx.path === '/output') {
        ctx.status = 200;
        ctx.type = 'image/png';
        ctx.body = fs.createReadStream('output.png');
    } else if (ctx.path === '/style.css') {
        ctx.status = 200;
        ctx.type = 'text/css';
        ctx.body = uglifycss.processFiles(['style.css']);
    } else {
        ctx.status = 500;
    }
});

app.listen(1235);
