module.exports = {
	name: 'peter',
	execute(message) {
		message.channel.send('', { files: ['./imgs/peter.jpg'] });
	}
};
