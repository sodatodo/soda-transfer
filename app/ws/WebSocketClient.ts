import WebSocket from 'ws';
import { openListener, messageListener } from './listeners';

export interface WebSocketMessage {
  type: string;
  clientType: string;
  targetId: string;
  data: any;
}

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export const wss = new WebSocket('wss://192.168.0.119:3006');

wss.on('open', openListener);
wss.on('message', messageListener);

export const getRemoteServerState = () => {
  wss.send(JSON.stringify({
    type: 'get-remote-server-state',
  }));
};

// export const swapOffer = (desc: WebSocketMessage) => {
//   // console.log('desc :>> ', desc);
//   wss.send(JSON.stringify({
//     type: 'swap-offer-desc',
//     clientType: desc.type,
//     targetId: desc.id,
//     desc: desc.desc,
//   }));
// };
export const sendWebSocketMessage = (message: WebSocketMessage) => {
  wss.send(JSON.stringify(message));
};

export default {};
