import { EventEmitter } from 'events';

class WebRTCState {
    remoteWebRTCDescription: any;

    emitter: EventEmitter;

    constructor() {
      this.emitter = new EventEmitter();
    }

    setRemoteWebRTCDescription = (message: any) => {
      console.log('message :>> ', message);
      const { data, ...others } = message;
      this.remoteWebRTCDescription = {
        ...others,
        desc: JSON.parse(data.description),
      };

      this.emitter.emit('on-get-remote-desc', this.remoteWebRTCDescription);
    }

    onGetRemoteDesc = (listener: any) => {
      this.emitter.on('on-get-remote-desc', listener);
    }
}

const instance = new WebRTCState();

export default instance;
