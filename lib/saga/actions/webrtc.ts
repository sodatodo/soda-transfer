import { createAction } from 'redux-actions';
import { webrtc } from '../types';

export const createOfferAction = createAction(webrtc.ON_CREATE_OFFER);
