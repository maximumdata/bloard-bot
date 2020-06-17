module.exports = {
	name: 'ponyo',
	execute(message) {
		message.channel.send('', { files: ['./imgs/ponyo.jpg'] });
	}
};
