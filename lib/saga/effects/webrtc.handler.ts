class WebRTCHandler {
    peerConnection: RTCPeerConnection;

    constructor() {
      this.peerConnection = new RTCPeerConnection();
    }

    createOffer = async () => {
      const offer = await this.peerConnection.createOffer();
      return offer;
    }
}
const instance = new WebRTCHandler();

export default instance;
