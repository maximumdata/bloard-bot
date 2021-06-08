export default {
  name: 'nickname',
  aliases: ['nick'],
  description: 'change bman\'s display name',
  usage: '',
  execute: async function (message, args) {
    if (args.length) {
      return await message.guild.me.setNickname(args.join(' '));
    }
  }
};
