import { createAction } from 'redux-actions';
import { webrtcTypes } from '../types';

export const saveLocalDescription = createAction(webrtcTypes.SAVE_LOCAL_DESCRIPTION);
export const saveRemoteDescription = createAction(webrtcTypes.SAVE_REMOTE_DESCRIPTION);
export const saveAnswerDescription = createAction(webrtcTypes.SAVE_ANSWER_DESCRIPTION);
export const setClientType = createAction(webrtcTypes.SET_CLIENT_TYPE);
