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

export const sanitizeText = (text: string): string => {
  if (!text) return '';
  // Basic XSS/HTML removal - using a non-backtracking approach where possible
  return text
    .replace(/<[^>]*?>/gm, '') // Use non-greedy match
    .replace(/&nbsp;/g, ' ')
    .trim();
};
