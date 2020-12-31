import { exec } from 'child_process';

const RESTART_COMMAND = 'pm2 restart bloard-bot';

export default async function restartService() {
  exec(RESTART_COMMAND);
}
