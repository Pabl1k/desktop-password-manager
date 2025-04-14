import { app, BrowserWindow, globalShortcut, shell } from 'electron';
import path from 'path';
import { devMode, getIconPath, PORT } from './utils.js';

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: true,
    autoHideMenuBar: true,
    show: false,
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

    globalShortcut.register('Control+Shift+I', () => {
      if (mainWindow) {
        mainWindow.webContents.toggleDevTools();
      }
    });
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
