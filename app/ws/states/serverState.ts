import { EventEmitter } from 'events';
// import { wss } from './WebSocketClient';

interface serverStateItem {
    id: string;
    remoteAddress: string;
}

class ServerState {
    state: serverStateItem[] = [];

    callback: any;

    emitter: EventEmitter;

    constructor() {
      this.emitter = new EventEmitter();
    }

    getServerState = () => this.state;

    setServerState = (newState: serverStateItem[]) => {
      // console.log('设置 state ', newState);
      this.state = newState;
      // if (this.callback) {
      //   this.callback(newState);
      // }
      this.emitter.emit('on-get-server-state', newState);
    }

    onGetServerState = (listener: any) => {
      this.emitter.on('on-get-server-state', listener);
    }
}

const instance = new ServerState();

export default instance;
