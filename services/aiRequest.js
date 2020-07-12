import axios from 'axios';

export default async function aiRequest(message, INFERKIT_API_KEY) {
	if (message.author.username === 'bloardman') return;
    const { content, author: { username } } = message;
    const INFERKIT_URL = 'https://api.inferkit.com/v1/models/standard/generate';
    const conversationStructure = `bloardman: what would you like to talk about?
${username}: ${content}
bloardman:`;

    const data = {
        "prompt": {
            "text": conversationStructure
        },
        "length": 150,
        "startFromBeginning": true
    };

    const { data: { data: result } } = await axios.post(INFERKIT_URL, data, { headers: { Authorization: `Bearer ${INFERKIT_API_KEY}` } });
    
    return result.text.split('\n')[0];
}
