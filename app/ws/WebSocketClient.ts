import WebSocket from 'ws';
import { openListener, messageListener } from './listeners';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
export const wss = new WebSocket('wss://192.168.0.119:3006');

wss.on('open', openListener);
wss.on('message', messageListener);

export const getRemoteServerState = () => {
  wss.send(JSON.stringify({
    type: 'get-remote-server-state',
  }));
};

export const swapOffer = (desc: any) => {
  wss.send(JSON.stringify({
    type: 'swap-offer-desc',
    targetId: desc.id,
    desc: desc.desc,
  }));
};

export default {};
