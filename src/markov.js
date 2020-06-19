import MarkovGen from 'markov-generator';
import fetchMessages from './fetchMessages';
import filterMessageContent from './filterMessageContent';

export default async function markov (message) {
	if (message.author.username === 'bloardman') return;
	const messages = await fetchMessages(message.channel);
	const filteredMentions = messages.map(mes => filterMessageContent(mes));
	const removedEmptyStrings = filteredMentions.filter(str => str != '' || str.length);

	const markov = new MarkovGen({
		input: removedEmptyStrings,
		minLength: 5
	});

	const result = markov.makeChain();
	message.reply(result);
}

