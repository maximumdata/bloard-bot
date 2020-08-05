import axios from 'axios';
import axiosRetry from 'axios-retry';

axiosRetry(axios, { retryDelay: axiosRetry.exponentialDelay});

export default async function aiRequest(message, INFERKIT_API_KEY) {
	if (message.author.username === 'bloardman') return;
    const { content, member: { displayName } } = message;
    const INFERKIT_URL = 'https://api.inferkit.com/v1/models/standard/generate';
    const conversationStructure = `${displayName}: ${content}
bloardman:`;

    const data = {
        "prompt": {
            "text": conversationStructure
        },
        "length": 150,
        "startFromBeginning": true
    };

    const { data: { data: result } } = await axios.post(INFERKIT_URL, data, { headers: { Authorization: `Bearer ${INFERKIT_API_KEY}` } });
    
    return result.text;
}
