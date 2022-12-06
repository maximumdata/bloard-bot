const { PREFIX: prefix } = process.env;

export default {
  name: 'help',
  aliases: ['commands'],
  description: 'List all of my commands, or info about a specific command',
  usage: '[command name]',
  execute: async function (message, args) {
    const data = [];
    const {
      client: { commands }
    } = message;
    if (!args.length) {
      data.push("Here's a list of all my commands:");
      data.push(commands.map(command => command.name).join(', '));
      data.push(
        `\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`
      );

      try {
        await message.author.send(data, { split: true });
        if (message.channel.type !== 'dm') {
          await message.reply("I've sent you a DM with all my commands");
        }
        return;
      } catch (e) {
        console.error(
          `could not send help DM to ${message.author.tag}.\n`,
          error
        );
        message.reply(
          "it seems like i can't DM you, do you have DMs disabled?"
        );
      }
    }

    const name = args[0].toLowerCase();
    const command =
      commands.get(name) ||
      commands.find(cmd => cmd.aliases && cmd.aliases.includes(name));

    if (!command) {
      return await message.reply("that's not a valid command");
    }

    data.push(`**Name:** ${command.name}`);

    if (command.aliases)
      data.push(`**Aliases:** ${command.aliases.join(', ')}`);
    if (command.description)
      data.push(`**Description:** ${command.description}`);
    if (command.usage)
      data.push(`**Usage: ${prefix}${command.name} ${command.usage}`);

    data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

    return await message.channel.send(data, { split: true });
  }
};
