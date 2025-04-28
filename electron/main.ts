import { app, BrowserWindow, dialog, globalShortcut, shell } from 'electron';
import log from 'electron-log';
import autoUpdaterPkg from 'electron-updater';
import path from 'path';
import { fileURLToPath } from 'url';
import { devMode, getIconPath, PORT } from './utils.js';

const { autoUpdater } = autoUpdaterPkg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

log.transports.console.level = 'silly';
log.transports.file.level = 'info';
log.transports.file.resolvePathFn = () => path.join(__dirname, 'logs/main.log');

app.on('ready', () => {
  log.info('Logger initialized, devMode: ', devMode);
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

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  if (devMode) {
    log.info('dev mode');
    mainWindow.loadURL(`http://localhost:${PORT}`);
    mainWindow.webContents.openDevTools();
  } else {
    log.info('prod mode');
    mainWindow.loadFile(path.join('dist-react', 'index.html'));

    globalShortcut.register('Control+Shift+I', () => {
      if (mainWindow) {
        mainWindow.webContents.toggleDevTools();
      }
    });

    log.info('App starting in production mode');
    // Update app
    autoUpdater.logger = log;

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
      log.info('Checking for update...');
    });

    autoUpdater.on('update-available', (info) => {
      log.info('Update available:', info);
    });

    autoUpdater.on('update-not-available', (info) => {
      log.info('No update available:', info);
    });

    autoUpdater.on('error', (err) => {
      log.error('Error in auto-updater:', err);
    });
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
