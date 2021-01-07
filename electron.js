const { app, BrowserWindow } = require('electron');
var path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1740,
    height: 940,
    icon: path.join(__dirname, 'assets/icons/png/64x64.png'),
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadFile('./src/index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
