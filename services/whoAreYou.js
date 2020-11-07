const Fs = require('fs');
const Path = require('path');
const Axios = require('axios');

async function downloadImage() {
  const url = 'https://thispersondoesnotexist.com/image';
  const path = Path.resolve(__dirname, '../imgs', 'face.jpg');
  const writer = Fs.createWriteStream(path);

  const response = await Axios({
    url,
    method: 'GET',
    responseType: 'stream'
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}

export default async function whoAreYou(message) {
  const data = await downloadImage();
  return await message.channel.send('heres me:', {
    files: [Path.resolve(__dirname, '../imgs', 'face.jpg')]
  });
}
