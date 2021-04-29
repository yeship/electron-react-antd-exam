import { app, BrowserWindow, protocol, Menu } from 'electron';
import createProtocol from 'umi-plugin-electron-builder/lib/createProtocol';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';

const isDevelopment = process.env.NODE_ENV === 'development';
let mainWindow: BrowserWindow;

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'


protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } },
]);

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,//跨域
    },
  });
  if (isDevelopment) {
    mainWindow.loadURL(`http://localhost:${process.env.PORT || '8000'}`);
  } else {
    // The production environment hides menus
    Menu.setApplicationMenu(null);

    createProtocol('app');
    mainWindow.loadURL('app://./index.html');
  }
  // Menu.setApplicationMenu(null);
}

app.on('ready', async () => {
  if (isDevelopment) {
    // Install React Devtools
    try {
      await installExtension(REACT_DEVELOPER_TOOLS);
    } catch (e) {
      console.error('React Devtools failed to install:', e.toString())
    }
  }
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
