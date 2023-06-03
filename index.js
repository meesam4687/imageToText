const jimp = require('jimp');
function getCharacter(bw) {
  const asciiChars = '@%#*+=-:. ';
  const charIndex = Math.round((bw / 255) * (asciiChars.length - 1));
  return asciiChars.charAt(charIndex);
}
jimp.read('image.jpg', (err, image) => {
  if (err) {
    console.error('Failed to read the image file:', err);
    return;
  }
  let imgArr = []
  const terminalWidth = process.stdout.columns;
  image.scaleToFit(terminalWidth, jimp.AUTO);
  image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
    const red = this.bitmap.data[idx];
    const green = this.bitmap.data[idx + 1];
    const blue = this.bitmap.data[idx + 2];
    const gray = Math.round((red + green + blue) / 3);
    imgArr.push(getCharacter(gray))
  });
  console.log(imgArr.join(""))
});