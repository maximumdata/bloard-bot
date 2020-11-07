export default {
  name: 'jagger',
  aliases: [],
  cooldown: 3,
  description: 'Jagger pic :) (im buny)',
  execute: async function (message) {
    await message.channel.send('', { files: ['./imgs/jagger.jpg'] });
  }
};
