import fs from 'fs';

const pickRandom = (array) => {
	return array[Math.floor(Math.random() * array.length)];
}

module.exports = {
	name: 'jerry',
	aliases: ['jerru'],
	execute(message) {
		const jerries = fs.readdirSync('./jerries');
//		const jerry = jerries[Math.floor(Math.random() * jerries.length)];
		let jerry = pickRandom(jerries);
		while (jerry == '.DS_Store') {
			jerry = pickRandom(jerries);
		}
		
		message.channel.send('', { files: [`./jerries/${jerry}`] });
	}
};
