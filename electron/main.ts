import { app, BrowserWindow, shell } from 'electron';
import path from 'path';

const devMode = process.env.NODE_ENV === 'development';
const PORT = 1234;

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: true,
    autoHideMenuBar: true
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
