import fs from 'fs';

module.exports = {
	name: 'jerry',
	aliases: ['jerru'],
	execute(message) {
		const jerries = fs.readdirSync('./jerries');
		const jerry = jerries[Math.floor(Math.random() * jerries.length)];
		
		message.channel.send('', { files: [`./jerries/${jerry}`] });
	}
};
