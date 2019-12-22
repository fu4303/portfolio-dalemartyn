const downloadFigmaImage = require('./download-figma-image');

const images = require('../../src/_data/figma-images.json');

async function downloadFigmaImages() {
  for (let image of images.slice(0, 1)) {
    console.log('downloading ' + image.title);
    try {
      await downloadFigmaImage(image);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = downloadFigmaImages;
