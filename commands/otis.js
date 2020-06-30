export default {
	name: 'otis',
	aliases: ['pork'],
	cooldown: 3,
	description: 'otis pic :)',
	execute: async function (message) {
		await message.channel.send('', { files: ['./imgs/otis.png'] });
	}
};
