import aiRequest from '../services/aiRequest';

export default {
  name: 'clear',
  aliases: ['loop'],
  description: 'clear bloardman if he gets stuck in a loop',
  usage: '!clear',
  execute: async function (message, args, INFERKIT_KEY) {
    const msg = await aiRequest(message, INFERKIT_KEY, false, true, `i'm bloardman and i love to`);
    await message.reply(msg);
  }
};
