import discord from 'discord.js';

export default function checkCooldown(cooldowns, command, message) {
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
        message.author.send(
          `please wait ${timeLeft.toFixed(
            1
          )} more second(s) before using the \`${command.name}\` command`
        );
      } catch (e) {
        console.log(`tried to DM ${message.author.name} and it failed`);
        console.error(e);
      } finally {
        return 1;
      }
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  return 0;
}
