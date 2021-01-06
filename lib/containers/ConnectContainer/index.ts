import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import ConnectContainer from './ConnectContainer';
import { webrtcActions } from '../../store/actions';

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
});
export default connect(mapStateToProps, mapDispatchToProps)(ConnectContainer);
