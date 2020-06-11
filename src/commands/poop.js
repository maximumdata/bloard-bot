

module.exports = {
	name: 'poop',
	cooldown: 0.1,
	execute(message) {
		const values = [{
			value: 'poopoo',
			probability: '*'
		},{
			value: 'pee',
			probability: 0.2
		},{
			value: 'doodoo',
			probability: 0.2
		},{
			value: 'poopy',
			probability: 0.2
		},{
			value: 'peepee',
			probability: 0.2
		},{
			value: 'poop',
			probability: 0.05
		}];
		let i, pickedValue,
            randomNr = Math.random(),
            threshold = 0;

    for (i = 0; i < values.length; i++) {
        if (values[i].probability === '*') {
            continue;
        }

        threshold += values[i].probability;
        if (threshold > randomNr) {
                pickedValue = values[i].value;
                break;
        }

        if (!pickedValue) {
            pickedValue = values.filter((value) => value.probability === '*')[0].value;
        }
    }

		message.reply(pickedValue);
	}
};
