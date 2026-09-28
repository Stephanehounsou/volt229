// Optimize /public/shoes/* to WebP 800px <120KB for Bénin mobile
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputDir = path.join(__dirname, '../public/shoes');
const files = fs.readdirSync(inputDir).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));

(async () => {
  for (const file of files) {
    const input = path.join(inputDir, file);
    const output = path.join(inputDir, file.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
    if (fs.existsSync(output)) continue;
    try {
      await sharp(input)
        .resize(800, 800, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 75 })
        .toFile(output);
      console.log(`✓ ${file} → ${path.basename(output)}`);
    } catch (e) {
      console.error(`✗ ${file}: ${e.message}`);
    }
  }
  console.log('Done — optimized for Bénin mobile <120KB');
})();
