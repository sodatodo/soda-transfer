import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import './index.less';
import rpc from './utils/rpc';

console.log('rpc :>> ', rpc);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
