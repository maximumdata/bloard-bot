import MarkovGen from 'markov-generator';
import fetchMessages from './fetchMessages';
import filterMessageContent from './filterMessageContent';

export default async function markov(message) {
  if (message.author.username === 'bloardman') return;
  const textChannels = message.guild.channels.cache.filter(
    channel => channel.messages
  );
  const arrayOfMessagesPerChannel = await Promise.all(
    textChannels.map(async channel => {
      return await fetchMessages(channel);
    })
  );

  const messages = arrayOfMessagesPerChannel.flat();
  const filteredMessages = messages.map(mes => filterMessageContent(mes));
  const noEmpties = filteredMessages.filter(str => str !== '' || str.length);

  const markov = new MarkovGen({
    input: noEmpties,
    minLength: 12,
    bannedTerminals: ['is', 'was', 'a', 'and', 'the', 'of', 'an', 'to']
  });

  return markov.makeChain();
}
