export default {
	name: 'watching',
	aliases: [],
	description: 'Sets the Watching... status on the bot',
	usage: '<string to set as watching>',
	execute: async function (message, args) {
		const watching = args.join(' ');
		return await message.client.user.setActivity(watching, { type: 'WATCHING' });
	}
};
