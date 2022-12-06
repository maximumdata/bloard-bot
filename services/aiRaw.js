import axios from 'axios';
import axiosRetry from 'axios-retry';

axiosRetry(axios, { retries: 3 });

export default async function aiRaw(message, INFERKIT_API_KEY, rawInput, length=200) {
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
  const replyStringOrig = result.text.trim();//filtered[0].trim();
  let replyString = replyStringOrig.toLowerCase();

  if (replyString.length <= 1 || replyString.includes('nigger') || replyString.includes('nigga') || replyString.includes('faggot') || replyString.includes('fag') || replyString.includes('rape')) {
    return await aiRaw(message, INFERKIT_API_KEY, rawInput, length);
  }
  
  replyString = replyStringOrig;
  return replyString;
  
}
