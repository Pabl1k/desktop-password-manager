import { app, BrowserWindow, shell } from 'electron';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

const devMode = process.env.NODE_ENV === 'development';
const PORT = 1234;

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

const getIconPath = () => {
  const iconExt = getIconExtensionByPlatform();

  return devMode
    ? path.join(__dirname, `../assets/icons/icon.${iconExt}`)
    : path.join(process.resourcesPath, 'dist-icons', `icon.${iconExt}`);
};

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: true,
    autoHideMenuBar: true,
    icon: getIconPath()
  });

  mainWindow.on('ready-to-show', () => mainWindow.show());

  mainWindow.maximize();

  mainWindow.webContents.setWindowOpenHandler((data) => {
    shell.openExternal(data.url);
    return { action: 'deny' };
  });

  if (devMode) {
    mainWindow.loadURL(`http://localhost:${PORT}`);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadURL(path.join(app.getAppPath(), '/dist-react/index.html'));
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
