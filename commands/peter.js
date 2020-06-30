export default {
	name: 'peter',
	aliases: [],
	cooldown: 3,
	description: 'peter pic :)',
	execute: async function (message) {
		await message.channel.send('', { files: ['./imgs/peter.jpg'] });
	}
};
