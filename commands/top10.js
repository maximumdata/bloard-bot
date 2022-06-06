import aiRaw from "../services/aiRaw";
import dotenv from 'dotenv';

dotenv.config();

export default {
  name: 'top10',
  aliases: [],
  description: 'Try to get a top 10 list from the stupid AI',
  usage: '',
  execute: async function (message, args) {
    if (args.length) {
      try {
        const listName = args.join(' ');
        const input = `Here is Bloardman's top 10 list of ${listName}:
10.)`;
        const output = await aiRaw(message, process.env.INFERKIT_KEY, input);
        await message.reply(output);
      } catch (error) {
        throw error;
      }

    }
  }
};
