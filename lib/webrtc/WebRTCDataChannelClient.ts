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

    setRemoteDescriptionAndCreateAnswer = async (
      description: RTCSessionDescriptionInit,
    ) => {
      this.peerConnection.setRemoteDescription(description);
      // super.setRemoteDescription(description);
      const rtcSessionDescription = await this.peerConnection.createAnswer();
      return rtcSessionDescription;
    }
}

export default WebRTCDataChannelClient;
