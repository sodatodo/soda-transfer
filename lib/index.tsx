import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './app';
import './index.less';
import rpc from './utils/rpc';
import configureStore, { history } from './configureStore';

console.log('rpc :>> ', rpc);

const store = configureStore({}, history);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
