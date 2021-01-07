import {
  all, take, takeEvery,
} from 'redux-saga/effects';
import { ActionWithPayload } from '../../store/actions';
import rpc from '../../utils/rpc';
import { webrtc } from '../types';
import webrtcHandler from './webrtc.handler';

function* createWebrtcOffer() {
  yield takeEvery(webrtc.ON_CREATE_OFFER, function* (action: ActionWithPayload<any>) {
    console.log('action :>> ', action);
    const { payload } = action;
    const { id } = payload;
    const offer = yield webrtcHandler.createOffer();
    rpc.emit('websocket-message', {
      type: 'swap-offer-desc',
      clientType: 'caller',
      targetId: id,
      data: {
        description: JSON.stringify(offer),
      },
    });
    const remoteDescAction = yield take(webrtc.ON_SET_REMOTE_DESCRIPTION);
    console.log('remoteDescAction :>> ', remoteDescAction);
  });
}

export default function* rootSaga() {
  yield all([
    createWebrtcOffer(),
  ]);
}
