export default {
	name: 'pregluigi',
	aliases: [],
	cooldown: 3,
	description: 'disgusting garbage',
	execute: async function (message) {
		await message.channel.send('', { files: ['./imgs/pregluigi.jpg'] });
	}
};
