export const uniqueId = (length = 16) =>
  [...Array(length)].map(() => Math.random().toString(36).charAt(2)).join('');

export const generatePassword = (length = 16) => {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+{}[]<>?/~|';

  const allChars = lowercase + uppercase + numbers + symbols;
  let password = '';

  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];

  for (let i = 4; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  return password
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');
};

export const copyToClipboard = async (value: string) => {
  if (!value) {
    return;
  }

  if (!navigator.clipboard) {
    console.error('Clipboard API not supported');
  }

  await navigator.clipboard.writeText(value);
};

export const getLinkHostname = (link: string) => {
  if (!link) {
    return;
  }

  const formatted = link.replace(/^(https?:\/\/)?(www\.)?/, 'https://');

  try {
    const url = new URL(formatted);
    return url.hostname;
  } catch (error) {
    console.error('Invalid URL:', link);
    return link;
  }
};

export const openExternally = (url: string) => {
  if (!url) {
    return;
  }

  const formattedUrl = url.startsWith('http') ? url : `//${url}`;

  const a = document.createElement('a');
  a.href = formattedUrl;
  a.target = '_blank';
  a.rel = 'noreferrer';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
