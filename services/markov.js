import MarkovGen from 'markov-generator';
import fetchMessages from './fetchMessages';
import inferkitRequest from './inferkitRequest';
import filterMessageContent from './filterMessageContent';

export default async function markov(message, channels, key) {
	if (message.author.username === 'bloardman') return;
	const textChannels = message.guild.channels.cache.filter(channel => channel.messages);
	const arrayOfMessagesPerChannel = await Promise.all(textChannels.map(async (channel) => {
		return await fetchMessages(channel);
	}));

	const messages = arrayOfMessagesPerChannel.flat();;
	const filteredMessages = messages.map(mes => filterMessageContent(mes))
	const noEmpties = filteredMessages.filter(str => str !== '' || str.length);
	
	const markov = new MarkovGen({
		input: noEmpties,
		minLength: 5
	});

	const result = markov.makeChain();
	let output;
	try {
		output = await inferkitRequest(result, key);
		console.log('ai success');
	} catch(e) {
		console.error('Failed making inferkit request', e);
		output = result;
	}

	return await message.reply(output);
}

