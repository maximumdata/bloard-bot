module.exports = {
	name: 'kiki',
	execute(message) {
		message.channel.send('give her a slice 🍕', { files: ['./imgs/kiki.jpg'] });
	}
};
