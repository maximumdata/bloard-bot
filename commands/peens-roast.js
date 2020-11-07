export default {
  name: 'peens-roast',
  aliases: ['peens'],
  cooldown: 3,
  description: 'peens gets ethered by jerry',
  execute: async function (message) {
    await message.channel.send('', { files: ['./imgs/peens-roast.png'] });
  }
};
