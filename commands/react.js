const emojis = {
    a: '🇦', b: '🇧', c: '🇨', d: '🇩',
    e: '🇪', f: '🇫', g: '🇬', h: '🇭',
    i: '🇮', j: '🇯', k: '🇰', l: '🇱',
    m: '🇲', n: '🇳', o: '🇴', p: '🇵',
    q: '🇶', r: '🇷', s: '🇸', t: '🇹',
    u: '🇺', v: '🇻', w: '🇼', x: '🇽',
    y: '🇾', z: '🇿', 0: '0⃣', 1: '1⃣',
    2: '2⃣', 3: '3⃣', 4: '4⃣', 5: '5⃣',
    6: '6⃣', 7: '7⃣', 8: '8⃣', 9: '9⃣',
    10: '🔟', '#': '#⃣', '*': '*⃣',
    '!': '❗', '?': '❓',
};

const createWordArray = word => word.toLowerCase().split('');

const reactToMessage = async (message, word) => {
	const wordArray = createWordArray(word);
	for (let x = 0; x < wordArray.length; x++) {
		const letter = wordArray[x];
		const emoji = emojis[letter];
		if (emoji) {
			try {
				await message.react(emoji);
			} catch (e) {
				console.error(e);
			}
		} else {
			continue;
		}
	}
};

export default {
	name: 'react',
	aliases: [],
	description: 'Attempt to add reactions to a given message',
	usage: '<Link or ID of message to react to> <word to spell out in reactions>',
	execute: async function (message, args) {
		if (args.length > 1) {
			const mes = args[0];
			const what = mes.split('/');
			const huh = what.length > 1 ? what[what.length - 1] : mes;
			const word = args[1];
			try {
				const m = await message.channel.messages.fetch(huh);
				await reactToMessage(m, word);
			} catch (error) {
				console.error(error);
			}
		} else {
			const word = args[0];
			const twoMessages = await message.channel.messages.fetch({ limit: 2 });
			const m = twoMessages.last();
			await reactToMessage(m, word);
		}
	}
};
