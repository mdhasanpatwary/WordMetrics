export const toTitleCase = (text: string): string => {
  const smallWords = /^(a|an|the|and|but|or|nor|for|so|yet|at|by|in|of|on|per|to|up|via|as)$/i;
  
  return text
    .trim()
    .split(/\s+/)
    .map((word, index, array) => {
      const lowerWord = word.toLowerCase();
      
      if (
        index > 0 && 
        index < array.length - 1 && 
        smallWords.test(lowerWord)
      ) {
        return lowerWord;
      }
      
      return lowerWord.charAt(0).toUpperCase() + lowerWord.slice(1);
    })
    .join(' ');
};

export const toSentenceCase = (text: string): string => {
  const lower = text.toLowerCase();
  return lower.replace(/(^\s*\w|[.!?]\s+\w)/g, m => m.toUpperCase());
};

export const toToggleCase = (text: string): string => {
  return text.split('').map(char => {
    if (char === char.toUpperCase()) return char.toLowerCase();
    return char.toUpperCase();
  }).join('');
};

export const capitalizeWords = (text: string): string => {
  return text.toLowerCase().split(/(\s+)/).map(word => {
    if (word.trim().length === 0) return word;
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join('');
};

export const toCamelCase = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
    .replace(/^[A-Z]/, c => c.toLowerCase());
};

export const toPascalCase = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
    .replace(/^[a-z]/, c => c.toUpperCase());
};

export const toSnakeCase = (text: string): string => {
  return text
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    ?.map(x => x.toLowerCase())
    .join('_') || '';
};

export const toKebabCase = (text: string): string => {
  return text
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    ?.map(x => x.toLowerCase())
    .join('-') || '';
};
