module.exports = {
	name: 'watching',
	description: 'Sets the Watching... status on the bot',
	usage: '<string to set as watching>',
	execute(message, args) {
		const playing = args.join(' ');
		message.client.user.setActivity(playing, { type: 'WATCHING' });
	}
};
