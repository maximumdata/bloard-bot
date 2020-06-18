import discord from 'discord.js'
import fs from 'fs';
import markov from './markov';
require('dotenv').config();

process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));

const bot = new discord.Client();
bot.commands = new discord.Collection();

const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
const { TOKEN, PREFIX } = process.env;
const cooldowns = new discord.Collection();

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.name, command);
}


bot.once('ready', async () => {
	console.info(`logged in as ${bot.user.tag}`);
	//bot.user.setUsername('bloardman');
	//bot.user.setActivity('with my little penis');
});

bot.on('message', async (message) => {
	if (message.content.includes('bloardman')) {
		await markov(message);
		return;
	}

	if (!message.content.startsWith(PREFIX) || message.author.bot) return;

	const args = message.content.slice(PREFIX.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	if (!bot.commands.has(commandName)) return;

	const command = bot.commands.get(commandName) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${PREFIX}${command.name} ${command.usage}\``;
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
				return message.author.send(`please wait ${timeLeft.toFixed(1)} more second(s) before using the \`${command.name}\` command.`);
			} catch (error) {
				console.log(`tried to DM ${message.author.name} and it failed`);
				console.error(error);
				return;
			}
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('i made a poopy when i tried to run that command. tell mike he sucks');
	}
	
});

bot.login(TOKEN);
