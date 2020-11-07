import discord from 'discord.js';
import aiRequest from './aiRequest';

export default async function talkToRatbro(message, INFERKIT_KEY) {
  const { author } = message;
  const ratReply = await message.channel.awaitMessages(
    m => {
      return m.author.username === 'ratbro' && m.mentions.has(author);
    },
    { max: 1, time: 6000, errors: ['time'] }
  );
  const contentOnly = ratReply
    .first()
    .content.split(',')
    .slice(1)
    .join(',')
    .trim();
  const newMessage = {
    author,
    content: contentOnly,
    member: {
      displayName: 'ratbro'
    }
  };
  message.channel.startTyping();
  const aiReply = await aiRequest(newMessage, INFERKIT_KEY);
  return aiReply;
}
