import dotenv from 'dotenv';
import discord from 'discord.js';
import markov from './services/markov';
import checkCooldown from './services/checkCooldown';
import setUpCommands from './services/setUpCommands';
import whoAreYou from './services/whoAreYou';
import aiRequest from './services/aiRequest';

import react from './commands/react';

// init and environment setup
dotenv.config();
process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));

const { TOKEN, PREFIX, INFERKIT_KEY } = process.env;
const client = new discord.Client();
const cooldowns = new discord.Collection();

client.once('ready', async () => {
	console.info(`logged in as ${client.user.tag}`);
	client.commands = await setUpCommands();
});

client.on('message', async (message) => {
	if (message.content.toLowerCase().includes('nobra')) {
		react.execute(message, [message.id, 'nobra']);
	}

	if (message.mentions.has(client.user)) {
		const aiRes = await aiRequest(message, INFERKIT_KEY);
		try {
			return await message.reply(aiRes);
		} catch (error) {
			react.execute(message, [message.id, 'markov']);
			return await markov(message);
		}
	}

	if (message.content.toLowerCase().includes('bloardman')) {
		if (message.content.toLowerCase().includes('who are you') || message.content.toLowerCase().includes('what do you look like')) {
			return await whoAreYou(message);
		}
		return await markov(message);
	}

	if (!message.content.startsWith(PREFIX) || message.author.bot) return;

	const args = message.content.slice(PREFIX.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}`;
		if (command.usage) {
			reply += `\nThe proper usage would be \`${PREFIX}${command.name} ${command.usage}\``;
		}
		return message.channel.send(reply);
	}

	if (checkCooldown(cooldowns, command, message)) return;

	try {
		await command.execute(message, args);
	} catch (e) {
		console.error(e);
		await message.reply('i made a poopy when i tried to run that command. tell mike he sucks');
	}
});

client.login(TOKEN);
