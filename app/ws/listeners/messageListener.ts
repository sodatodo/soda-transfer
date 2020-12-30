import WebSocket, { Data } from 'ws';

const messageListener = (webSocket: WebSocket, data: Data) => {
  console.log('webSocket :>> ', webSocket);
  console.log('data :>> ', data);
};

export default messageListener;
