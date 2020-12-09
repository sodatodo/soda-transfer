const {
  app, BrowserWindow, Tray, Menu,
} = require('electron');
const path = require('path');

const getIcon = () => {
  if (process.platform === 'win32') return 'icon-light@2x.ico';
  // if (systemPreferences.isDarkMode()) return 'icon-light.png';
  return 'icon-dark.png';
};

let tray: any = null;

function createWindow() {
  // const iconPath = path.join(__dirname, 'assets', 'icon-dark.png');
  const iconDefault = path.join(__dirname, '../public/assets', getIcon());
  const iconPressed = path.join(__dirname, '../public/assets', 'icon-light.png');

  tray = new Tray(iconDefault);
  tray.setPressedImage(iconPressed);

  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  //   win.loadFile('http')
  console.log('process.platform :>> ', process.platform);
  if (process.env.NODE_ENV === 'development') {
    win.loadURL('http://localhost:8080');
  } else if (process.env.NODE_ENV === 'production') {
    win.loadFile('public/index.html');
  } else {
    throw new Error('未配置 NODE_ENV 环境变量');
  }

  tray.setToolTip('Clipmaster');
  updateMenu();
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

const updateMenu = () => {
  const menu = Menu.buildFromTemplate([
    {
      label: 'OpenClient',
      click() { },
      accelerator: 'CommandOrControl+Shift+C',
    },
    {
      label: 'Quit',
      click() {
        app.quit();
      },
      accelerator: 'CommandOrControl+Q',
    },
  ]);
  tray.setContextMenu(menu);
};
