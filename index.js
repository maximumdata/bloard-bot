import fs from 'fs';
import dotenv from 'dotenv';
import discord from 'discord.js';
import markov from './services/markov';
import setUpCommands from './services/setUpCommands';

// init and environment setup
dotenv.config();
process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));

const { TOKEN, PREFIX } = process.env;

const client = new discord.Client();;
const cooldowns = new discord.Collection();

client.once('ready', async () => {
	console.info(`logged in as ${client.user.tag}`);
	client.commands = await setUpCommands();
	console.log(client.commands.array());
});

client.on('message', async (message) => {
	if (message.content.toLowerCase().includes('bloardman')) {
		return await markov(message, client.channels);
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

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			try {
				return message.author.send(`please wait ${timeLeft.toFixed(1)} more second(s) before using the \`${command.name}\` command`);
			} catch (e) {
				console.log(`tried to DM ${message.author.name} and it failed`);
				console.error(e);
				return;
			}
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	} catch (e) {
		console.error(e);
		message.reply('i made a poopy when i tried to run that command. tell mike he sucks');
	}
});

client.login(TOKEN);
