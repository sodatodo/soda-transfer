import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron';
import createRPC from '../rpc';
import { createBufferReadLine } from '../utils/bufferreader';
import { getARPData, getNetworkInterfaceInfoList, parseArpLine } from '../utils/network';

export function newWindow(
  options_: BrowserWindowConstructorOptions,
  cfg: any,
  fn?: (win: BrowserWindow) => void,
): BrowserWindow {
  console.log('options_ :>> ', options_);
  console.log('cfg :>> ', cfg);
  console.log('fn :>> ', fn);
  const ipArray = getNetworkInterfaceInfoList();
  console.log('ipArray :>> ', ipArray);
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  window.webContents.openDevTools({ mode: 'undocked' });

  const rpc = createRPC(window);

  rpc.on('soda', (...args) => {
    console.log('sodalog hello world', args);
  });

  rpc.on('get-local-network-info', () => {
    const localNetworkInterfaceInfoList = getNetworkInterfaceInfoList();
    rpc.emit('get-local-network-info', localNetworkInterfaceInfoList);
  });

  rpc.on('get-arp-info', async () => {
    console.log('start get arp info');
    const arpData = await getARPData();
    const { code, data } = arpData;
    if (code === 0) {
      const rl = createBufferReadLine(data);
      let count = 0;
      const arpInfoSet = new Set();
      rl.on('line', (arpline) => {
        const arpInfo = parseArpLine(arpline);
        // console.log(`${count}:>> `, arpInfo);
        arpInfoSet.add(arpInfo);
        count += 1;
      });
      rl.on('close', () => {
        // console.log(`count is ${count}`);
        if (count > 0) {
          rpc.emit('get-arp-info', arpInfoSet);
        }
      });
    }
  });

  return window;
}

export default {};
