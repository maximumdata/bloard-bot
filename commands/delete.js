export default {
	name: 'delete',
	aliases: [],
	description: 'Sometimes bloardman says bad stuff. Use this to delete one of his messages.',
	usage: '<link to bloardman message to delete>',
	execute: async function (message, args, client) {
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
			const messages = await message.channel.messages.fetch({ limit: 20 })
			const sorted = messages.sort((a, b) => b.createdAt > a.createdAt);
			const mostRecent = sorted.find(element => element.author.username === 'bloardman');
			if (mostRecent) {
				await mostRecent.delete();
			}
		}
	}
};
