import { app, BrowserWindow, dialog, globalShortcut, shell } from 'electron';
import { autoUpdater } from 'electron-updater';
import path from 'path';
import { fileURLToPath } from 'url';
import { devMode, getIconPath, PORT } from './utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: true,
    autoHideMenuBar: true,
    show: false,
    icon: getIconPath(),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
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
  } else {
    mainWindow.loadFile(path.join('dist-react', 'index.html'));

    globalShortcut.register('Control+Shift+I', () => {
      if (mainWindow) {
        mainWindow.webContents.toggleDevTools();
      }
    });

    // Update app
    autoUpdater.setFeedURL({
      provider: 'github',
      owner: 'Pabl1k',
      repo: 'desktop-password-manager'
    });

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

    autoUpdater.on('checking-for-update', () => {
      console.log('Checking for update...');

      dialog.showMessageBox({
        type: 'info',
        title: 'Checking for update',
        message: 'Checking for updates...'
      });
    });

    autoUpdater.on('update-available', (info) => {
      console.log('Update available:', info);

      dialog.showMessageBox({
        type: 'info',
        title: 'Update available:',
        message: 'Update available: ' + JSON.stringify(info)
      });
    });

    autoUpdater.on('update-not-available', (info) => {
      console.log('Update not available:', info);

      dialog.showMessageBox({
        type: 'info',
        title: 'Update not available:',
        message: 'Update not available: ' + JSON.stringify(info)
      });
    });

    autoUpdater.on('error', (error) => {
      console.error('Auto updater error:', error);

      dialog.showErrorBox(
        'Update Error',
        'Failed to check for updates. Please try again later.\n\n' +
          (error == null ? 'unknown' : (error.stack ?? error).toString())
      );
    });
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
