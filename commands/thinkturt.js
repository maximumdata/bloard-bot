export default {
	name: 'thinkturt',
	aliases: ['think'],
	cooldown: 1000,
	description: 'Posts the thinkturt pic',
	execute: async function (message) {
		await message.channel.send('thinkturt', { files: ['./imgs/thinkturt.png'] });
	}
};
