import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron';
import createRPC from '../rpc';

export function newWindow(
  options_: BrowserWindowConstructorOptions,
  cfg: any,
  fn?: (win: BrowserWindow) => void,
): BrowserWindow {
  console.log('options_ :>> ', options_);
  console.log('cfg :>> ', cfg);
  console.log('fn :>> ', fn);
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  const rpc = createRPC(window);

  rpc.on('soda', () => {
    console.log('sodalog hello world');
  });

  return window;
}

export default {};
