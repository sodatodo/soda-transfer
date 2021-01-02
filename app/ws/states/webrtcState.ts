import { EventEmitter } from 'events';

class WebRTCState {
    remoteWebRTCDescription: any;

    emitter: EventEmitter;

    constructor() {
      this.emitter = new EventEmitter();
    }

    setRemoteWebRTCDescription = (desc: any) => {
      this.remoteWebRTCDescription = desc;

      this.emitter.emit('on-get-remote-desc', desc);
    }

    onGetRemoteDesc = (listener: any) => {
      this.emitter.on('on-get-remote-desc', listener);
    }
}

const instance = new WebRTCState();

export default instance;
