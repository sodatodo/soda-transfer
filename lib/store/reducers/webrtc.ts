import { ActionWithPayload } from '../actions';
import { webrtcTypes } from '../types';

const initialState = {
  clientType: '',
  localDescription: {},
  remoteDescription: {},
  answerDescription: {},
};
const webrtc = (state = initialState, action: ActionWithPayload<any>) => {
  switch (action.type) {
    case webrtcTypes.SAVE_LOCAL_DESCRIPTION:
      return {
        ...state,
        localDescription: action.payload,
      };
    case webrtcTypes.SAVE_REMOTE_DESCRIPTION:
      return {
        ...state,
        remoteDescription: action.payload,
      };
    case webrtcTypes.SAVE_ANSWER_DESCRIPTION:
      return {
        ...state,
        answerDescription: action.payload,
      };
    case webrtcTypes.SET_CLIENT_TYPE:
      return {
        ...state,
        clientType: action.payload,
      };

    default:
      return state;
  }
};
export default webrtc;
