import bloardPost from '../services/bloardPost';

export default {
  name: 'post',
  aliases: [],
  description: 'fetch a screenshot of a bloard post by given user',
  usage: '!post <bloard username>',
  execute: async function (message, args) {
    message.channel.startTyping();
    await bloardPost(message, args);
    return message.channel.stopTyping();
  }
};
