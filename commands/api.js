import fs from 'fs';

export default {
  name: 'api',
  aliases: ['password'],
  description: 'Shows the current password for the bloardtotransformer site',
  usage: '',
  execute: async function (message) {
    const file =
      process.platform === 'darwin'
        ? '/Users/mike/butt.txt'
        : '/home/mike/butt.txt';
    const buttTxt = fs.readFileSync(file, 'utf8');
    await message.channel.send(
      `Here's today's password for https://bloardtotransformer.com:`
    );
    return await message.channel.send(buttTxt.trim());
  }
};
