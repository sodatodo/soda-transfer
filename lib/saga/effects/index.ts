import { all } from 'redux-saga/effects';
import webrtc from './webrtc';

export default function* rootSaga() {
  yield all([
    webrtc(),
  ]);
}
