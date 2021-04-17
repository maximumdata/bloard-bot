import axios from 'axios';
import axiosRetry from 'axios-retry';
 
axiosRetry(axios, { retries: 3 });

export default async function defineAI(message, INFERKIT_API_KEY) {
    if (message.author.username === 'bloardman') return;
    const INFERKIT_URL = 'https://api.inferkit.com/v1/models/standard/generate';
    const phrase = message.content.replace('“', '"').replace('Bloardman', 'bloardman').replace('Define', 'define').split('bloardman define')[1].trim().replace(/"/g,"").trim();
    if (phrase) {
        const filledTemplate = `Webster's dictionary defines "${phrase}" as: `
        const data = {
            prompt: {
                text: filledTemplate
            },
            length: 500,
            startFromBeginning: true,
            topP: 0.9
        };
    
        const {
                data: { data: result }
            } = await axios.post(INFERKIT_URL, data, {
            headers: { Authorization: `Bearer ${INFERKIT_API_KEY}` }
        });
    
        const resultArray = result.text.split('\n');
        const filtered = resultArray.filter(str => str.length);
        const replyString = filtered[0].trim();

        if (replyString.length <= 1 || replyString.includes('nigger') || replyString.includes('nigga')) {
            return await aiRequest(message, INFERKIT_API_KEY);
        }

        return `Bloardman's dictionary defines "${phrase}" as: ${replyString}`;
    } else {
        return "";
    }
}
