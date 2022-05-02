const WORDS_PER_MINUTE = 200;
export function getReadingTime(content) {
  if (!content) return;
  const clean = content.replace(/<\/?[^>]+(>|$)/g, "");
  const numberOfWords = clean.split(/\s/g).length;
  const amount = Math.ceil(numberOfWords / WORDS_PER_MINUTE);
  return `${amount} min read`;
}
