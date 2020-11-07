import axios from 'axios';
import axiosRetry from 'axios-retry';

axiosRetry(axios, { retryDelay: axiosRetry.exponentialDelay });

function processResult(raw) {
  const lines = raw.split('\n');
  const bloardmanOnly = lines
    .filter(line => line.toLowerCase().startsWith('bloardman:'))
    .map(line =>
      line.replace('bloardman:', '').replace('Bloardman:', '').trim()
    );
  return bloardmanOnly.join(' ');
}

export default async function aiRequest(message, INFERKIT_API_KEY) {
  if (message.author.username === 'bloardman') return;
  const {
    content,
    member: { displayName }
  } = message;
  const INFERKIT_URL = 'https://api.inferkit.com/v1/models/standard/generate';
  const conversationStructure = `${displayName}: ${content}
bloardman:`;

  const data = {
    prompt: {
      text: conversationStructure
    },
    length: 200,
    startFromBeginning: true,
    topP: 1
  };

  const {
    data: { data: result }
  } = await axios.post(INFERKIT_URL, data, {
    headers: { Authorization: `Bearer ${INFERKIT_API_KEY}` }
  });

  return result.text.split('\n')[0];
}
