interface RTCPeerConnectionIceEventListener {
    (ev: RTCPeerConnectionIceEvent): any;
}
interface RTCDataChannelEventListener {
    (ev: RTCDataChannelEvent): any;
}
class WebRTCClient {
    peerConnection: RTCPeerConnection = new RTCPeerConnection();

    onIceCandidate: RTCPeerConnectionIceEventListener = (ev: RTCPeerConnectionIceEvent) => ev;

    onDataChannel: RTCDataChannelEventListener = (ev: RTCDataChannelEvent) => ev;

    constructor() {
      this.peerConnection.onicecandidate = this.handleIceCandidate;
      this.peerConnection.ondatachannel = this.handleDataChannel;
    }

    setIceCandidateListener = (listener: RTCPeerConnectionIceEventListener) => {
      this.onIceCandidate = listener;
    }

    handleIceCandidate = (ev: RTCPeerConnectionIceEvent) => {
      console.log('sodalog handle icecandidate');
      if (this.onIceCandidate) {
        this.onIceCandidate(ev);
      }
    }

    setDataChannelListener = (listener: RTCDataChannelEventListener) => {
      this.onDataChannel = listener;
    }

    handleDataChannel = (ev: RTCDataChannelEvent) => {
      if (this.onDataChannel) {
        this.onDataChannel(ev);
      }
    }

    // createOffer = (...args: any) => {
    //   console.log('create offer');
    //   return this.peerConnection.createOffer(...args);
    // }

    isEnvSupport = () => !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}

export default WebRTCClient;
