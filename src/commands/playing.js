module.exports = {
	name: 'playing',
	description: 'Sets the Playing... status on the bot',
	usage: '<string to set as playing>',
	execute(message, args) {
		const playing = args.join(' ');
		message.client.user.setActivity(playing);
	}
};
