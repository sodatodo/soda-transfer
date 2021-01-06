import { Action } from 'redux';
import * as webrtcActions from './webrtc';

export {
  webrtcActions,
};

export interface ActionWithPayload<T> extends Action {
  payload: T
}
