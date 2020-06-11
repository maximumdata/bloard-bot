module.exports = {
	name: 'reload',
	description: 'Reloads a command',
	execute(message, args) {
		if (message.author.id !== '222120928589512704') return;
		if (!args.length) return message.channel.send(`Hey dipshit you didn't send any command to reload`);
		const commandName = args[0].toLowerCase();
		const command = message.client.commands.get(commandName)
			|| message.client.commands.find(c => c.aliases && c.aliases.includes(commandName));

		if (!command) return message.channel.send(`Hey fuckface theres no command with the name or alias of ${commandName}`);

		delete require.cache[require.resolve(`./${command.name}.js`)];

		try {
			const newCommand = require(`./${command.name}.js`);
			message.client.commands.set(newCommand.name, newCommand);
			message.channel.send(`command \`${command.name}\` was reloaded`);
		} catch (error) {
			console.error(error);
			message.channel.send(`There was an error realoding a command \`${command.name}\`:\n\`${error.message}\``);
		}
	}
};
