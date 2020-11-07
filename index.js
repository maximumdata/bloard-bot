import dotenv from 'dotenv';
import discord from 'discord.js';
import checkCooldown from './services/checkCooldown';
import setUpCommands from './services/setUpCommands';
import talkToRatbro from './services/talkToRatbro';
import doAKickflip from './services/doAKickflip';
import whoAreYou from './services/whoAreYou';
import aiRequest from './services/aiRequest';
import markov from './services/markov';
import react from './commands/react';

// init and environment setup
dotenv.config();
process.on('unhandledRejection', error =>
  console.error('Uncaught Promise Rejection', error)
);

const { TOKEN, PREFIX, INFERKIT_KEY } = process.env;
const client = new discord.Client();
const cooldowns = new discord.Collection();

client.once('ready', async () => {
  console.info(`logged in as ${client.user.tag}`);
  client.commands = await setUpCommands();
});

client.on('message', async message => {
  if (message.content.toLowerCase().includes('nobra')) {
    react.execute(message, [message.id, 'nobra']);
  }

  if (message.author.username === 'bloardman') return;

  if (
    message.mentions.has(client.user) ||
    (message.content.toLowerCase().includes('bloardman') &&
      !message.content.toLowerCase().includes('!post'))
  ) {
    message.channel.startTyping();

    if (message.content.toLowerCase().includes('talk to ratbro')) {
      message.channel.stopTyping();
      try {
        let ratbro;
        try {
          ratbro = await message.guild.members.fetch('720598812665839617');
          if (ratbro.presence.status !== 'online') {
            await message.reply('my best friend ratbro is offline ):');
            return message.channel.stopTyping();
          }
        } catch (error) {
          await message.reply("my best friend ratbro isn't in this server :(");
          return message.channel.stopTyping();
        }
        const aiRatRes = await talkToRatbro(message, INFERKIT_KEY);
        await message.channel.send(aiRatRes, { reply: ratbro });
      } catch (error) {
        console.error(error);
        await message.reply('i broke :(');
      } finally {
        return message.channel.stopTyping();
      }
    }

    if (
      message.content.toLowerCase().includes('who are you') ||
      message.content.toLowerCase().includes('what do you look like')
    ) {
      await whoAreYou(message);
      return message.channel.stopTyping();
    }

    if (message.content.toLowerCase().includes('do a kickflip')) {
      await doAKickflip(message);
      return message.channel.stopTyping();
    }

    if (message.content.toLowerCase().split(' ').length <= 1) {
      const mark = await markov(message);
      message.content = mark;
    }

    try {
      const aiRes = await aiRequest(message, INFERKIT_KEY);
      await message.reply(aiRes);
    } catch (error) {
      // react.execute(message, [message.id, 'ibroke']);
      const mark = await markov(message);
      await message.reply(`[AI failed]: ${mark}`);
    } finally {
      return message.channel.stopTyping();
    }
  }

  if (!message.content.startsWith(PREFIX) || message.author.bot) return;

  const args = message.content.slice(PREFIX.length).split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      cmd => cmd.aliases && cmd.aliases.includes(commandName)
    );

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
    await message.reply(
      'i made a poopy when i tried to run that command. tell mike he sucks'
    );
    message.channel.stopTyping();
  }
});

client.login(TOKEN);
