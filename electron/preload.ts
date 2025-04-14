import { contextBridge, shell } from 'electron';
import { ElectronApi } from '../globalTypes.js';

const api: ElectronApi = {
  openExternal: (url: string) => shell.openExternal(url)
};

contextBridge.exposeInMainWorld('electronAPI', api);
