import aiRequest from '../services/aiRequest';

export default {
  name: 'nickname',
  aliases: ['nick'],
  description: 'change bman\'s display name',
  usage: '',
  execute: async function (message, args, INFERKIT_KEY) {
    if (args.length) {
      const name = args.join(' ');
      const msg = await aiRequest(message, INFERKIT_KEY, false, true, `My name is ${name}, and i love to`);
      message.channel.startTyping();
      await message.guild.me.setNickname(name);
      await message.reply(msg)
      message.channel.stopTyping();
    }
  }
};
