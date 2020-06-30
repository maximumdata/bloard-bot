export default {
	name: 'playing',
	aliases: [],
	description: 'Sets the Playing... status on the bot',
	usage: '<string to set as playing>',
	execute: async function (message, args) {
		const playing = args.join(' ');
		return await message.client.user.setActivity(playing);
	}
};
