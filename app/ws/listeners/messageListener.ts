import { Data } from 'ws';
import serverState from '../states/serverState';
import webrtcState from '../states/webrtcState';

const messageListener = (data: Data) => {
  // console.log('data :>> ', data);
  let message;
  if (data) {
    try {
      message = JSON.parse(data.toString());
    } catch (error) {
      console.log('error :>> ', error);
    }
  }
  if (message && 'type' in message) {
    switch (message.type) {
      case 'server_state':
        serverState.setServerState(message.state);
        break;
      case 'swap-offer-desc':
        webrtcState.setRemoteWebRTCDescription(message.desc);
        break;
      default:
        break;
    }
  }
};

export default messageListener;
