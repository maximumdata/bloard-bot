module.exports = {
	name: 'listening',
	description: 'Sets the Listening... status on the bot',
	usage: '<string to set as listening>',
	execute(message, args) {
		const playing = args.join(' ');
		message.client.user.setActivity(playing, { type: 'LISTENING' });
	}
};
