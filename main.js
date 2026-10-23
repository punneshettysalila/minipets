const { app, BrowserWindow, screen } = require('electron');
const path = require('path');

function createWindow() {
  const display = screen.getPrimaryDisplay();
  const { width, height } = display.workAreaSize;
  const window = new BrowserWindow({
    x: 0,
    y: 0,
    width,
    height,
    transparent: true,
    frame: false,
    resizable: false,
    skipTaskbar: true,
    alwaysOnTop: true,
    hasShadow: false,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  window.setAlwaysOnTop(true, 'floating');
  window.on('minimize', event => {
    event.preventDefault();
    window.showInactive();
  });
  window.on('hide', () => {
    if (!window.isDestroyed()) window.showInactive();
  });
  window.loadFile(path.join(__dirname, 'mini-pets-web.html'), { query: { desktop: '1' } });
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => app.quit());
