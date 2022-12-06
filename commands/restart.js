import { exec } from 'child_process';

const RESTART_COMMAND = 'pm2 restart bloard-bot';

export default {
  name: 'restart',
  aliases: ['reboot'],
  description: 'reboot bloardman if he gets stuck in a loop',
  usage: '!restart',
  execute: async function (message, args) {
    await message.reply('restarting - gimme a minute to turn my brain back on');
    exec(RESTART_COMMAND);
  }
};
