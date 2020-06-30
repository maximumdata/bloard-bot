export default {
	name: 'kiki',
	aliases: [],
	cooldown: 3,
	description: 'kiki pic :)',
	execute: async function (message) {
		await message.channel.send('give her a slice 🍕', { files: ['./imgs/kiki.jpg'] });
	}
};
