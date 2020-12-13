import { app, BrowserWindow } from 'electron';
// import isDev from 'electron-is-dev';
import { newWindow } from './ui/window';

const windowSet = new Set<BrowserWindow>([]);

app.on('ready', () => {
  function createWindow(fn?: (win: BrowserWindow) => void, options: Record<string, any> = {}) {
    // 获取窗口大小
    const [width, height] = [800, 600];

    const hwin = newWindow({ width, height }, {});
    windowSet.add(hwin);
    const url = 'http://localhost:8080';
    hwin.loadURL(url);

    hwin.on('close', () => {
      windowSet.delete(hwin);
    });
    hwin.on('closed', () => {
      if (process.platform !== 'darwin' && windowSet.size === 0) {
        app.quit();
      }
    });

    return hwin;
  }
  createWindow();

  // app.createWindow = createWindow;

  // mac only
  app.on('activate', () => {
    if (!windowSet.size) {
      createWindow();
    }
  });

  app.on('open-file', (event, path) => {
    console.log('event :>> ', event);
    console.log('path :>> ', path);
  });
});
