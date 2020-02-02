const sharp = require('sharp');

const resizer = (file, size, isTransparent) => (
    sharp(file)
        .resize({
            width: size.width,
            height: size.height,
            fit: 'contain',
            background: {
                r: 255, g: 255, b: 255,
                alpha: isTransparent ? 0 : 1
            },
        })
);

const returnJPGBuffer = async (file, size, isTransparent) => {
    return await resizer(file, size, isTransparent)
        .jpg()
        .toBuffer();
};

const returnPNGBuffer = async (file, size, isTransparent) => {
    return await resizer(file, size, isTransparent)
        .png()
        .toBuffer();
};

exports.returnJPGBuffer = returnJPGBuffer;
exports.returnPNGBuffer = returnPNGBuffer;