import { EventEmitter } from 'events';
import { ipcMain, BrowserWindow } from 'electron';
import { v4 as uuid } from 'uuid';

export class Server extends EventEmitter {
  destroyed = false;

  win: BrowserWindow;

  id!: string;

  constructor(win: BrowserWindow) {
    super();
    this.win = win;
    this.ipcListener = this.ipcListener.bind(this);

    if (this.destroyed) {
      return;
    }

    const uid = uuid();
    this.id = uid;

    ipcMain.on(uid, this.ipcListener);

    this.wc.on('did-finish-load', () => {
      // console.log('browser did finish load');
      this.wc.send('init', uid);
    });
  }

  get wc() {
    return this.win.webContents;
  }

  ipcListener(event: any, { ev, data }: {ev: string; data: any}) {
    super.emit(ev, data);
  }
}

export default (win: BrowserWindow) => new Server(win);
