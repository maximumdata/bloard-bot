export default {
  name: 'thinkturt',
  aliases: ['think'],
  cooldown: 3,
  description: 'Posts the thinkturt pic',
  execute: async function (message) {
    await message.channel.send('', { files: ['./imgs/thinkturt.png'] });
  }
};
