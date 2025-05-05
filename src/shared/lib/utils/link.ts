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
