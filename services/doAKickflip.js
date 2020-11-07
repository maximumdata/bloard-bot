const GIFEncoder = require('gif-encoder-2');
const { createCanvas, Image } = require('canvas');
const {
  createWriteStream,
  readdir,
  readFileSync,
  existsSync,
  fstat
} = require('fs');
const { promisify } = require('util');
const path = require('path');
const imgur = require('imgur-uploader');
const axios = require('axios');

const readdirAsync = promisify(readdir);
const imagesFolder = path.join(__dirname, '../', 'input');

async function downloadImage(url, user) {
  const pathFile = path.join(__dirname, '../avatars', `${user}.gif`);
  const writer = createWriteStream(pathFile);

  const response = await axios({
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

async function createGif(user) {
  const dstPath = path.resolve(__dirname, '../kickflips', `${user}.gif`);
  return new Promise(async resolve1 => {
    const files = await readdirAsync(imagesFolder);

    const [width, height] = await new Promise(resolve2 => {
      const image = new Image();
      image.onload = () => resolve2([image.width, image.height]);
      image.src = path.join(imagesFolder, files[1]);
    });

    const writeStream = createWriteStream(dstPath);

    writeStream.on('finish', async () => {
      resolve1(dstPath);
    });

    const encoder = new GIFEncoder(width, height, 'octree', true);

    encoder.createReadStream().pipe(writeStream);
    encoder.start();
    encoder.setDelay(100);

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';

    let userImg;

    await new Promise(resolve4 => {
      const image = new Image();
      image.onload = () => {
        userImg = image;
        resolve4();
      };
      image.src = path.resolve(__dirname, '../avatars', `${user}.gif`);
    });

    for (const file of files) {
      await new Promise(resolve3 => {
        const image = new Image();
        image.onload = () => {
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(userImg, 122, 244, 56, 56);
          ctx.drawImage(image, 0, 0);
          encoder.addFrame(ctx);
          resolve3();
        };
        image.src = path.join(imagesFolder, file);
      });
    }
    encoder.finish();
    return encoder.out.getData();
  });
}

export default async function doAKickflip(message) {
  try {
    const username = message.author.username;
    if (
      !existsSync(path.resolve(__dirname, '../kickflips', `${username}.gif`))
    ) {
      let avi;
      if (!existsSync(path.join(__dirname, '../avatars', `${username}.gif`))) {
        avi = message.author.displayAvatarURL({ format: 'png', size: 64 });
        await downloadImage(avi, username);
      }
      const img = await createGif(username);
      const upload = await imgur(readFileSync(img));
      await message.channel.send(upload.link);
    } else {
      const upload = await imgur(
        readFileSync(path.resolve(__dirname, '../kickflips', `${username}.gif`))
      );
      await message.channel.send(upload.link);
    }
  } catch (error) {
    console.error(error);
    await message.reply('i broke :(');
  }
}
