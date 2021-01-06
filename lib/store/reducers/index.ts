import { combineReducers } from 'redux';
import { History } from 'history';
import { connectRouter } from 'connected-react-router';
import webrtc from './webrtc';

const createRootReducer = (history: History) => combineReducers({
  router: connectRouter(history),
  webrtc,
});

export default createRootReducer;
