const Koa = require('koa');
const app = new Koa();
const route = require('koa-route');
const multer = require('koa-multer');
const fs = require('fs');
const pug = require('pug');
const uglifycss = require('uglifycss');
const { returnBuffer } = require('./processor');

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
            const isTransparent = ctx.req.body.background === 'transparent' ? true : false;
            const extension = ctx.req.body.extension;
            const newBuf = await returnBuffer(buf, size, isTransparent, extension);
            fs.writeFileSync(__dirname + `/output.${extension}`, newBuf);
            ctx.status = 200;
            ctx.body = pug.renderFile(`download-${extension}.pug`);
        }
    } else if (ctx.path === '/output.jpg') {
        ctx.status = 200;
        ctx.type = 'image/jpg';
        ctx.body = fs.createReadStream('output.jpg');
    } else if (ctx.path === '/output.png') {
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
