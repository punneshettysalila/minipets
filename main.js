const { app, BrowserWindow, screen } = require('electron');
const path = require('path');

function createWindow() {
  const displays = screen.getAllDisplays();
  const bounds = displays.reduce((area, display) => ({
    x: Math.min(area.x, display.bounds.x),
    y: Math.min(area.y, display.bounds.y),
    right: Math.max(area.right, display.bounds.x + display.bounds.width),
    bottom: Math.max(area.bottom, display.bounds.y + display.bounds.height)
  }), { x: 0, y: 0, right: 0, bottom: 0 });
  const window = new BrowserWindow({
    x: bounds.x,
    y: bounds.y,
    width: bounds.right - bounds.x,
    height: bounds.bottom - bounds.y,
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
  window.loadFile(path.join(__dirname, 'index.html'), { query: { desktop: '1' } });
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => app.quit());
