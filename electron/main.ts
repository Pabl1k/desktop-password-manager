import { app, BrowserWindow, dialog, globalShortcut, shell } from 'electron';
import autoUpdaterPkg from 'electron-updater';
import path from 'path';
import { devMode, getIconPath, PORT } from './utils.js';

const { autoUpdater } = autoUpdaterPkg;

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: true,
    autoHideMenuBar: true,
    show: false,
    icon: getIconPath(),
    webPreferences: {
      devTools: devMode
    }
  });

  mainWindow.on('ready-to-show', () => mainWindow.show());

  mainWindow.maximize();

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  if (devMode) {
    mainWindow.loadURL(`http://localhost:${PORT}`);

    mainWindow.webContents.openDevTools();
    globalShortcut.register('Control+Shift+I', () => {
      if (mainWindow) {
        mainWindow.webContents.toggleDevTools();
      }
    });
  } else {
    mainWindow.loadFile(path.join('dist-react', 'index.html'));

    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow.webContents.closeDevTools();
    });

    mainWindow.webContents.on('before-input-event', (event, input) => {
      if (
        ((input.control || input.meta) && input.shift && input.key.toLowerCase() === 'i') ||
        input.key.toLowerCase() === 'f12'
      ) {
        event.preventDefault();
      }
    });

    // Update app
    autoUpdater.checkForUpdatesAndNotify();

    autoUpdater.on('update-downloaded', () => {
      dialog
        .showMessageBox({
          type: 'info',
          title: 'Update Ready',
          message: 'A new version has been downloaded. Restart the app to apply the update?',
          buttons: ['Restart', 'Later']
        })
        .then((result) => {
          if (result.response === 0) {
            autoUpdater.quitAndInstall();
          }
        });
    });
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
