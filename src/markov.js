import MarkovGen from 'markov-generator';

export default async function markov (message) {
	if (message.author.username === 'bloardman') return;
	const allMessages = await message.channel.messages.fetch({ limit: 100 });
	const arrayMessages = allMessages.array();
	//const filteredByUser = arrayMessages.filter(mes => (mes.author.id === message.author.id) && mes.content.length);
	const filteredByUser = arrayMessages.filter(mes => mes.content.length);;
	const arrayOfMessageContents = filteredByUser.map(mes => mes.content);
	const markov = new MarkovGen({
		input: arrayOfMessageContents,
		minLength: 5
	});

	const result = markov.makeChain();
	message.reply(result);
}
