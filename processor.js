const sharp = require('sharp');

const returnPNGBuffer = async (file, size, isTransparent) => {
    const alpha = isTransparent ? 0 : 1;
    return await sharp(file)
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
        .toBuffer();
};

exports.returnPNGBuffer = returnPNGBuffer;