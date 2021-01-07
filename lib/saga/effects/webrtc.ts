import {
  all, takeEvery,
} from 'redux-saga/effects';
import { ActionWithPayload } from '../../store/actions';
import { webrtc } from '../types';
import webrtcHandler from './webrtc.handler';

function* createWebrtcOffer() {
  yield takeEvery(webrtc.ON_CREATE_OFFER, async (action: ActionWithPayload<any>) => {
    console.log('action :>> ', action);
    const offer = await webrtcHandler.createOffer();
    console.log('offer :>> ', offer);
  });
}

export default function* rootSaga() {
  yield all([
    createWebrtcOffer(),
  ]);
}
