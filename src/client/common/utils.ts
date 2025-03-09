export const uniqueId = (length = 16) =>
  [...Array(length)].map(() => Math.random().toString(36).charAt(2)).join('');
