const fs = require('fs').promises;
const sharp = require('sharp');
const returnBuffer = require('./processor').returnBuffer;

describe('Image processing', () => {
    it('Adds transparent background to a PNG image and return JPG', async () => {
        const sampleSize = { width: 123, height: 45 };
        const sampleJPGBuffer = await fs.readFile('./sample-input.png');
        const transformedImageBuffer = await returnBuffer(sampleJPGBuffer, sampleSize, true, 'jpg');
        const outputMetadata = await sharp(transformedImageBuffer).metadata();
        expect(outputMetadata.width).toBe(sampleSize.width);
        expect(outputMetadata.height).toBe(sampleSize.height);
        expect(outputMetadata.format).toBe('jpeg');
    });
    it('Adds transparent background to a JPG image and return JPG', async () => {
        const sampleSize = { width: 123, height: 45 };
        const sampleJPGBuffer = await fs.readFile('./sample-input.jpg');
        const transformedImageBuffer = await returnBuffer(sampleJPGBuffer, sampleSize, true, 'jpg');
        const outputMetadata = await sharp(transformedImageBuffer).metadata();
        expect(outputMetadata.width).toBe(sampleSize.width);
        expect(outputMetadata.height).toBe(sampleSize.height);
        expect(outputMetadata.format).toBe('jpeg');
    });
    it('Adds transparent background to a PNG image and return PNG', async () => {
        const sampleSize = { width: 123, height: 45 };
        const sampleJPGBuffer = await fs.readFile('./sample-input.png');
        const transformedImageBuffer = await returnBuffer(sampleJPGBuffer, sampleSize, true, 'png');
        const outputMetadata = await sharp(transformedImageBuffer).metadata();
        expect(outputMetadata.width).toBe(sampleSize.width);
        expect(outputMetadata.height).toBe(sampleSize.height);
        expect(outputMetadata.format).toBe('png');
    });
    it('Adds transparent background to a JPG image and return PNG', async () => {
        const sampleSize = { width: 123, height: 45 };
        const sampleJPGBuffer = await fs.readFile('./sample-input.jpg');
        const transformedImageBuffer = await returnBuffer(sampleJPGBuffer, sampleSize, true, 'png');
        const outputMetadata = await sharp(transformedImageBuffer).metadata();
        expect(outputMetadata.width).toBe(sampleSize.width);
        expect(outputMetadata.height).toBe(sampleSize.height);
        expect(outputMetadata.format).toBe('png');
    });
});