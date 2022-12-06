export default function filterMessageContent(message) {
  return message.content
    .replace(/retarded/gi, 'insanely smart')
    .replace(/retard/gi, 'genius')
    .replace(/(\<.*?\,)/g, '')
    .replace(/([!]+)/g, '')
    .replace(/(\<.*?>)/g, '')
    .trim();
}
