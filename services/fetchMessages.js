export default async function fetchMessages(channel, limit = 500) {
	if (!channel.messages) { return []; }
	const compiledMessages = [];
	let lastId;

	while(true) {
		const options = { limit: 100 };

		if (lastId) {
			options.before = lastId;
		}

		const messages = await channel.messages.fetch(options);
		
		compiledMessages.push(...messages.array());
		lastId = messages.last().id;

		if (messages.size != 100 || compiledMessages.length >= limit) {
			break;
		}
	}
	
	return compiledMessages.filter(mes => mes.content.length);
}
