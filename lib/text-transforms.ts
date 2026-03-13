export const removeExtraSpaces = (text: string): string => {
  return text.trim().replace(/\s+/g, ' ');
};

export const removeLineBreaks = (text: string): string => {
  return text.replace(/\n/g, ' ');
};

export const removeDuplicateLines = (text: string): string => {
  const lines = text.split('\n');
  return Array.from(new Set(lines)).join('\n');
};

export const sortLines = (text: string, direction: 'asc' | 'desc' = 'asc'): string => {
  const lines = text.split('\n');
  const sorted = lines.sort((a, b) => {
    return direction === 'asc' ? a.localeCompare(b) : b.localeCompare(a);
  });
  return sorted.join('\n');
};

export const reverseText = (text: string): string => {
  return text.split('').reverse().join('');
};

export const toTitleCase = (text: string): string => {
  return text.toLowerCase().split(' ').map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
};

export const toSentenceCase = (text: string): string => {
  return text.toLowerCase().replace(/(^\w|\.\s*\w)/g, m => m.toUpperCase());
};

export const toToggleCase = (text: string): string => {
  return text.split('').map(char => {
    if (char === char.toUpperCase()) return char.toLowerCase();
    return char.toUpperCase();
  }).join('');
};

export const capitalizeWords = (text: string): string => {
  return text.split(' ').map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join(' ');
};
