import axios from 'axios';

export default async function inferkitRequest(input, key) {
	const REQUEST_URL = 'https://api.inferkit.com/v1/models/standard/generate';
	const request = {
		'prompt': {
			'text': input
		},
		length: 200,
		startFromBeginning: true
	};

	try {
		const { data: { data: { text } } } = await axios.post(REQUEST_URL, request, { headers: { Authorization: `Bearer ${key}` } });
		return `${input}${text}`;
	} catch (e) {
		throw e;
	}
};
