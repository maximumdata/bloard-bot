export default {
  name: 'grimey',
  aliases: [],
  cooldown: 3,
  description: 'Grimey pic :)',
  execute: async function (message) {
    await message.channel.send('', { files: ['./imgs/grimey.jpg'] });
  }
};
