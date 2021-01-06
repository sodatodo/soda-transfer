import WebRTCClient from './WebRTCClient';

interface gotRTCSessionDescriptionListener {
  (desc: RTCSessionDescriptionInit): any,
}

class WebRTCDataChannelClient extends WebRTCClient {
    onGotDescription: gotRTCSessionDescriptionListener | undefined;

    dataChannel: RTCDataChannel | undefined;

    createDataChannel = () => {
      this.dataChannel = this.peerConnection.createDataChannel('sendDataChannel');
      this.dataChannel.onopen = () => {
        console.log('data channel open');
      };
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

    setLocalDescription = (description: RTCSessionDescriptionInit) => {
      console.log('set local desc', description);
      this.peerConnection.setLocalDescription(description);
    }

    setRemoteDescription = (description: RTCSessionDescriptionInit) => {
      console.log('set remote desc', description);
      this.peerConnection.setRemoteDescription(description);
    }

    setRemoteDescriptionAndCreateAnswer = async (
      description: RTCSessionDescriptionInit,
    ) => {
      this.peerConnection.setRemoteDescription(description);
      const rtcSessionDescription = await this.peerConnection.createAnswer();
      return rtcSessionDescription;
    }
}

export default WebRTCDataChannelClient;
