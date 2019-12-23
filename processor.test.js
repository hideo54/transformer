const fs = require('fs').promises;
const sharp = require('sharp');
const returnPNGBuffer = require('./processor').returnPNGBuffer;

describe('Image processing', () => {
    test('Adds transparent background to a PNG image', async () => {
        const sampleSize = { width: 123, height: 45 };
        const sampleJPGBuffer = await fs.readFile('./sample-input.png');
        const transformedImageBuffer = await returnPNGBuffer(sampleJPGBuffer, sampleSize, true);
        const outputMetadata = await sharp(transformedImageBuffer).metadata();
        expect(outputMetadata.width).toBe(sampleSize.width);
        expect(outputMetadata.height).toBe(sampleSize.height);
        expect(outputMetadata.format).toBe('png');
    });
    test('Adds transparent background to a JPG image', async () => {
        const sampleSize = { width: 123, height: 45 };
        const sampleJPGBuffer = await fs.readFile('./sample-input.jpg');
        const transformedImageBuffer = await returnPNGBuffer(sampleJPGBuffer, sampleSize, true);
        const outputMetadata = await sharp(transformedImageBuffer).metadata();
        expect(outputMetadata.width).toBe(sampleSize.width);
        expect(outputMetadata.height).toBe(sampleSize.height);
        expect(outputMetadata.format).toBe('png');
    });
});