export default {
  name: 'ponyo',
  aliases: [],
  cooldown: 3,
  description: 'ponyo pic :)',
  execute: async function (message) {
    await message.channel.send('', { files: ['./imgs/ponyo.jpg'] });
  }
};
