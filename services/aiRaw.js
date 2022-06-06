import axios from 'axios';
import axiosRetry from 'axios-retry';

axiosRetry(axios, { retries: 3 });

export default async function aiRaw(message, INFERKIT_API_KEY, rawInput, length) {
  if (message.author.username === 'bloardman') return;

  const INFERKIT_URL = 'https://api.inferkit.com/v1/models/standard/generate';
  const data = {
    prompt: {
      text: rawInput
    },
    length,
    startFromBeginning: true,
    topP: 0.9
  };

  const {
    data: { data: result }
  } = await axios.post(INFERKIT_URL, data, {
    headers: { Authorization: `Bearer ${INFERKIT_API_KEY}` }
  });
  
  //const resultArray = result.text.split('\n');
  //const filtered = resultArray.filter(str => str.length);
  const replyString = result.text.trim();//filtered[0].trim();

  if (replyString.length <= 1 || replyString.includes('nigger') || replyString.includes('nigga') || replyString.includes('faggot') || replyString.includes('fag')) {
    return await aiRaw(message, INFERKIT_API_KEY, rawInput);
  }
  return replyString;
  
}
