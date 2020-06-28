import fs from 'fs';
import path from 'path';
import discord from 'discord.js';

export default async function setUpClient () {
	try {
		const directory = path.join(__dirname, '../commands');
		const commandFiles = fs.readdirSync(directory).filter(file => file.endsWith('.js'));

		const commands = new discord.Collection();

		for (const file of commandFiles) {
			const filePath = path.join(__dirname, `../commands/${file}`);
			const { default: command } = await import(filePath);
			commands.set(command.name, command);
		}

		return commands;
	} catch (e) {
		console.error(e);
		process.exit();
	}
}
