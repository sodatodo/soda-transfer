import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './app';
import './index.less';
import rpc from './utils/rpc';
import configureStore, { history, runSaga } from './configureStore';
import rootSaga from './saga/effects';

console.log('rpc :>> ', rpc);

const store = configureStore({}, history);
runSaga(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
