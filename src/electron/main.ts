import { app, BrowserWindow } from 'electron';
import path from 'path';
import { isDev, PORT } from './utils.js';

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: true,
    autoHideMenuBar: true
  });

  mainWindow.on('ready-to-show', () => mainWindow.show());

  mainWindow.maximize();

  if (isDev()) {
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
