const Koa = require('koa');
const app = new Koa();
const route = require('koa-route');
const multer = require('koa-multer');
const fs = require('fs');
const pug = require('pug');
const uglifycss = require('uglifycss');

const sharp = require('sharp');
const returnPNG = async (file, size, isTransparent) => {
    const alpha = isTransparent ? 0 : 1;
    await sharp(file)
        .resize({
            width: size.width,
            height: size.height,
            fit: 'contain',
            background: {
                r: 255, g: 255, b: 255,
                alpha: alpha
            },
        })
        .png()
        .toFile('output.png');
};

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
            await returnPNG(buf, size, isTransparent);
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
