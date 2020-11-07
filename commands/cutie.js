export default {
  name: 'cutie',
  aliases: ['sweetie'],
  cooldown: 3,
  description: 'Posts the old dog pic, you can also use :olddog:',
  execute: async function (message) {
    await message.channel.send('', { files: ['./imgs/sweetie.jpg'] });
  }
};
