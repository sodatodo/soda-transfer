// import { wss } from './WebSocketClient';

interface serverStateItem {
    id: string;
    remoteAddress: string;
}

class ServerState {
    state: serverStateItem[] = [];

    callback: any;

    getServerState = () => this.state;

    setServerState = (newState: serverStateItem[]) => {
      console.log('设置 state ', newState);
      this.state = newState;
      if (this.callback) {
        this.callback(newState);
      }
    }

    setServerStateListener = (callback: any) => {
      this.callback = callback;
    }
}

const instance = new ServerState();

export default instance;
