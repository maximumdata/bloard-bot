import fs from 'fs';

const pickRandom = array => {
  return array[Math.floor(Math.random() * array.length)];
};

export default {
  name: 'jerry',
  aliases: ['jerru'],
  description: 'picks a random jerry image',
  usage: '',
  execute: async function (message) {
    const jerries = fs.readdirSync('./jerries');
    let jerry = pickRandom(jerries);
    while (jerry == '.DS_Store') {
      jerry = pickRandom(jerry);
    }

    return await message.channel.send('', { files: [`./jerries/${jerry}`] });
  }
};
