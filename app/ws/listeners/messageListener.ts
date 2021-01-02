import { Data } from 'ws';
import serverState from '../serverState';

const messageListener = (data: Data) => {
  console.log('data :>> ', data);
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
      default:
        break;
    }
  }
};

export default messageListener;
