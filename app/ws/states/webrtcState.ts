interface WebRTCDescriptionListener {
    (description: any): void
}
class WebRTCState {
    remoteWebRTCDescription: any;

    onGetRemoteWebRTCDescription: WebRTCDescriptionListener = (desc) => {
      console.log('desc :>> ', desc);
    }

    setRemoteWebRTCDescriptionListener = (listener: WebRTCDescriptionListener) => {
      this.onGetRemoteWebRTCDescription = listener;
    }

    setRemoteWebRTCDescription = (desc: any) => {
      this.remoteWebRTCDescription = desc;
      if (this.onGetRemoteWebRTCDescription) {
        this.onGetRemoteWebRTCDescription(desc);
      }
    }
}

const instance = new WebRTCState();

export default instance;
