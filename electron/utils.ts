import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

export const PORT = 1234;
export const devMode = process.env.NODE_ENV === 'development';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getCurrentOS = () => {
  const platform = os.platform();

  if (platform === 'win32') {
    return 'windows';
  }
  if (platform === 'darwin') {
    return 'macos';
  }
  if (platform === 'linux') {
    return 'linux';
  }

  return 'unknown';
};

const getIconExtensionByPlatform = () => {
  const platform = getCurrentOS();

  if (platform === 'macos') {
    return 'icns';
  }
  if (platform === 'linux') {
    return 'png';
  }

  return 'ico';
};

export const getIconPath = () => {
  const iconExt = getIconExtensionByPlatform();

  return devMode
    ? path.join(__dirname, `../assets/icons/icon.${iconExt}`)
    : path.join(process.resourcesPath, 'dist-icons', `icon.${iconExt}`);
};
