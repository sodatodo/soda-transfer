import React from 'react';
import ReactDOM from 'react-dom';
import electron from 'electron';

function App() {
  console.log('electron.ipcRenderer :>> ', electron.ipcRenderer);
  electron.ipcRenderer.on('hello', (ev) => {
    console.log('ev :>> ', ev);
  });
  return (
    <div>Hello React! soda</div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
