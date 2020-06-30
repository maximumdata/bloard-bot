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

export default {
	name: 'react',
	aliases: [],
	description: 'Attempt to add reactions to a given message',
	usage: '<Link or ID of message to react to> <word to spell out in reactions>',
	execute: async function (message, args) {
		const mes = args[0];
		const what = mes.split('/');
		const huh = what.length > 1 ? what[what.length - 1] : mes;
		const word = args[1].toLowerCase().split('');
		try {
			const m = await message.channel.messages.fetch(huh);
			for (let x = 0; x < word.length; x++) {
				const letter = word[x];
				const emoji = emojis[letter];
				await m.react(emoji);
			}
		} catch (error) {
			console.error(error);
		}
	}
};
