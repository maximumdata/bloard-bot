export default {
  name: 'listening',
  aliases: [],
  description: 'Sets the Listening... status on the bot',
  usage: '<string to set as listening>',
  execute: async function (message, args) {
    const playing = args.join(' ');
    return await message.client.user.setActivity(playing, {
      type: 'LISTENING'
    });
  }
};
