const sharp = require('sharp');

const returnBuffer = async (file, size, isTransparent, extension) => {
    const resized = await sharp(file)
        .resize({
            width: size.width,
            height: size.height,
            fit: 'contain',
            background: {
                r: 255, g: 255, b: 255,
                alpha: isTransparent ? 0 : 1
            },
        });
    if (extension === 'jpg') {
        return await resized.jpeg().toBuffer();
    }
    if (extension === 'png') {
        return await resized.png().toBuffer();
    }
};

exports.returnBuffer = returnBuffer;