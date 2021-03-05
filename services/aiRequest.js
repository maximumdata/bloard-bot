import axios from 'axios';
import axiosRetry from 'axios-retry';
import fetchMessages from './fetchMessages';

axiosRetry(axios, { retryDelay: axiosRetry.exponentialDelay });

export default async function aiRequest(message, INFERKIT_API_KEY, ratbro) {
  if (message.author.username === 'bloardman') return;

  const INFERKIT_URL = 'https://api.inferkit.com/v1/models/standard/generate';
  const channelLog = ratbro
    ? `ratbro: ${message.content}`
    : await fetchMessages(message.channel);
  const conversationStructure = `${channelLog}
bloardman:`;

  const data = {
    prompt: {
      text: conversationStructure
    },
    length: 200,
    startFromBeginning: true,
    topP: 0.5
  };

  const {
    data: { data: result }
  } = await axios.post(INFERKIT_URL, data, {
    headers: { Authorization: `Bearer ${INFERKIT_API_KEY}` }
  });

  const resultArray = result.text.split('\n');
  const filtered = resultArray.filter(str => str.length);
  const replyString = filtered[0].trim();

  if (replyString.length <= 1) {
    return await aiRequest(message, INFERKIT_API_KEY);
  }

  return replyString;
}
