export default {
	name: 'delete',
	aliases: [],
	description: 'Sometimes bloardman says bad stuff. Use this to delete one of his messages.',
	usage: '<link to bloardman message to delete>',
	execute: async function (message, args) {
        if (args.length) {
			const mes = args[0];
			const what = mes.split('/');
			const huh = what.length > 1 ? what[what.length - 1] : mes;
			try {
				const m = await message.channel.messages.fetch(huh);
				await m.delete();
			} catch (error) {
				console.error(error);
			}
		} else {
			const twoMessages = await message.channel.messages.fetch({ limit: 2 });
			const m = twoMessages.last();
			await m.delete();
		}
	}
};
