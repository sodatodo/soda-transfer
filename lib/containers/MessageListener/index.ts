import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { webrtcActions } from '../../saga/actions';
import MessageListener from './MessageListener';

const mapStateToProps = (state: any) => ({ state });
const mapDispatchToProps = (dispatch: Dispatch) => ({
  setRemoteDesc: (message: any) => dispatch(webrtcActions.setRemoteDescriptionAction(message)),
});
export default connect(mapStateToProps, mapDispatchToProps)(MessageListener);
