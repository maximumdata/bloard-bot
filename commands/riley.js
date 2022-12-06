export default {
  name: 'riley',
  aliases: [],
  cooldown: 3,
  description: 'riley pic :)',
  execute: async function (message) {
    await message.channel.send('', { files: ['./imgs/riley.jpg'] });
  }
};
