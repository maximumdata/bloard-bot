import aiRaw from "../services/aiRaw";
import dotenv from 'dotenv';

dotenv.config();

function filterEmpties(input) {
  return output;
}

export default {
  name: 'top3',
  aliases: [],
  description: 'Try to get a top 10 list from the stupid AI',
  usage: '',
  execute: async function (message, args) {
    if (args.length) {
      try {
        message.channel.startTyping();
        const listName = args.join(' ');
        const input = `
Here is Bloardman's short top 3 list of ${listName}:
3.)`;
        const result = await aiRaw(message, process.env.INFERKIT_KEY, input, 200);

        const output = `Here is Bloardman's top 3 list of ${listName}:
3.) ${result.trim()}`;
        await message.reply(output);
      } catch (error) {
        throw error;
      } finally {
        return message.channel.stopTyping();
      }

    }
  }
};
