import axios from 'axios';
import axiosRetry from 'axios-retry';
import fetchMessages from './fetchMessages';

axiosRetry(axios, { retries: 3 });

export default async function aiRequest(
  message,
  INFERKIT_API_KEY,
  ratbro,
  clear,
  clearMsg
) {
  if (message.author.username === 'bloardman') return;

  const INFERKIT_URL = 'https://api.inferkit.com/v1/models/standard/generate';
  const channelLog = ratbro
    ? `ratbro: ${message.content}`
    : await fetchMessages(message.channel);
  let conversationStructure = `${channelLog}
bloardman:`;

  if (clear && clearMsg) {
    conversationStructure = clearMsg;
  }

  const data = {
    prompt: {
      text: conversationStructure,
    },
    length: 1000,
    startFromBeginning: false,
    topP: 0.9
  };

  const {
    data: { data: result },
  } = await axios.post(INFERKIT_URL, data, {
    headers: { Authorization: `Bearer ${INFERKIT_API_KEY}` },
  });
  if (!clear) {
    const resultArray = result.text.split('\n');
    const filtered = resultArray.filter((str) => str.length);
    const replyString = filtered[0].trim();

    if (
      replyString.length <= 1 ||
      replyString.includes('nigger') ||
      replyString.includes('nigga') ||
      replyString.includes('faggot') ||
      replyString.includes('fag') ||
      replyString.includes('rape') ||
      replyString.includes('rapist')
    ) {
      return await aiRequest(message, INFERKIT_API_KEY);
    }
    return replyString;
  } else {
    let testString = result.text;
    if (
      testString.includes('nigger') ||
      testString.includes('nigga') ||
      testString.includes('faggot') ||
      testString.includes('fag') ||
      testString.includes('rape') ||
      testString.includes('rapist')
    ) {
      testString = ' be gay';
    }
    return `${clearMsg}${testString}`;
  }
}
