const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, 'src/img');

if (!fs.existsSync(imgDir)) {
    console.error('Image directory not found');
    process.exit(1);
}

const files = fs.readdirSync(imgDir);

async function processImages() {
    for (const file of files) {
        if (file.endsWith('.jpg') || file.endsWith('.png')) {
            const inputPath = path.join(imgDir, file);
            const filename = path.parse(file).name;
            
            // Create mobile version (600px width)
            const mobileWebpPath = path.join(imgDir, `${filename}_mobile.webp`);
            
            if (!fs.existsSync(mobileWebpPath)) {
                try {
                    await sharp(inputPath)
                        .resize(600)
                        .webp({ quality: 80 })
                        .toFile(mobileWebpPath);
                    console.log(`Created mobile version: ${mobileWebpPath}`);
                } catch (err) {
                    console.error(`Error processing ${file}:`, err);
                }
            }
        }
    }
}

processImages();