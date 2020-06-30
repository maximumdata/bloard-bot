export default function filterMessageContent(message) {
	return message.content.replace(/(\<.*?\,)/g, '').replace(/([!]+)/g, '').replace(/(\<.*?>)/g, '').trim();
}
