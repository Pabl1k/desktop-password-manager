import { app, BrowserWindow } from 'electron';
import path from 'path';
import { isDev, PORT } from './utils.js';

app.on('ready', () => {
  const mainWindow = new BrowserWindow({});

  if (isDev()) {
    mainWindow.loadURL(`http://localhost:${PORT}`);
  } else {
    mainWindow.loadURL(path.join(app.getAppPath(), '/dist-react/index.html'));
  }
});
