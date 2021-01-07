import { createAction } from 'redux-actions';
import { webrtc } from '../types';

export const createOfferAction = createAction(webrtc.ON_CREATE_OFFER);
export const setRemoteDescriptionAction = createAction(webrtc.ON_SET_REMOTE_DESCRIPTION);
