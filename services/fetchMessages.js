export default async function fetchMessages(channel) {
  if (!channel.messages) {
    return [];
  }

  const messages = await channel.messages.fetch({ limit: 8 });

  const compiledMessages = messages
    .map(msg => {
      if (msg.content.length) {
        const content = msg.content.replace(new RegExp('<.*?>', 'g'), '');
        return `${msg.author.username}: ${content}`;
      }
    })
    .filter(msg => msg.length)
    .reverse();

  return compiledMessages.join('\n');
}
