import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron';
import createRPC from '../rpc';
import { createBufferReadLine } from '../utils/bufferreader';
import { getARPData, getNetworkInterfaceInfoList, parseArpLine } from '../utils/network';
import serverState from '../ws/states/serverState';
import webrtcState from '../ws/states/webrtcState';
import { getRemoteServerState, sendWebSocketMessage, WebSocketMessage } from '../ws/WebSocketClient';

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

  rpc.on('get-remote-server-state', () => {
    // serverState.setServerStateListener((newState: any) => {
    //   rpc.emit('get-remote-server-state', newState);
    // });
    getRemoteServerState();
  });

  rpc.on('websocket-message', (offerDesc: WebSocketMessage) => {
    sendWebSocketMessage(offerDesc);
  });

  // rpc.on('swap-answer-offer-desc', (answerOfferDesc: any) => {
  //   swapOffer(answerOfferDesc);
  // });

  serverState.onGetServerState((newState: any) => {
    rpc.emit('get-remote-server-state', newState);
  });

  webrtcState.onGetRemoteDesc((desc: any) => {
    // console.log('desc indes :>> ', desc);
    rpc.emit('on-get-remote-offer-desc', desc);
  });

  return window;
}

export default {};
