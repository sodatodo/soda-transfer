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
      this.peerConnection.setLocalDescription(desc);
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
      // this.peerConnection.setLocalDescription(rtcSessionDescription);
      return rtcSessionDescription;
    }
}

export default WebRTCDataChannelClient;
