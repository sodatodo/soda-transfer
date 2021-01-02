import WebRTCClient from './WebRTCClient';

interface gotRTCSessionDescriptionListener {
  (desc: RTCSessionDescriptionInit): any,
}

class WebRTCDataChannelClient extends WebRTCClient {
    onGotDescription: gotRTCSessionDescriptionListener | undefined;

    createDataChannel = () => {
      this.peerConnection.createDataChannel('sendDataChannel');
    }

    createOffer = (onGotDescription?: gotRTCSessionDescriptionListener) => {
      this.onGotDescription = onGotDescription;
      this.peerConnection.createOffer().then(
        this.handleGotDescription,
        this.handleGotDescriptionError,
      );
    }

    handleGotDescription: gotRTCSessionDescriptionListener = (desc) => {
      if (this.onGotDescription) {
        this.onGotDescription(desc);
      }
    }

    handleGotDescriptionError = (error: Error) => {
      console.log('error :>> ', error);
    }
}

export default WebRTCDataChannelClient;
