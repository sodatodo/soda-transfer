import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import ConnectContainer from './ConnectContainer';
import { webrtcActions } from '../../store/actions';
import { webrtcActions as webrtcSagaActions } from '../../saga/actions';

const mapStateToProps = (state: any) => ({
  clientType: state.webrtc.clientType,
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSetLocalDescription: (
    description: RTCSessionDescriptionInit,
  ) => dispatch(webrtcActions.saveLocalDescription(description)),
  onGetRemoteDescription: (
    description: RTCSessionDescriptionInit,
  ) => dispatch(webrtcActions.saveRemoteDescription(description)),
  onGetAnswerDescription: (
    description: RTCSessionDescriptionInit,
  ) => dispatch(webrtcActions.saveAnswerDescription(description)),
  onSetClientType: (
    clientType: string,
  ) => dispatch(webrtcActions.setClientType(clientType)),
  createOffer: (
    turnHost: string,
  ) => dispatch(webrtcSagaActions.createOfferAction(turnHost)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ConnectContainer);
