import React, { useEffect } from 'react';
import { Layout } from 'antd';
// import electron from 'electron';
import { ConnectContainer } from '../containers';
import style from './style.module.less';

function App() {
  // console.log('electron.ipcRenderer :>> ', electron.ipcRenderer);
  // electron.ipcRenderer.on('hello', (ev) => {
  //   console.log('ev :>> ', ev);
  // });
  useEffect(() => {
    // electron.ipcRenderer.on('init', (event, args) => {
    //   console.log('event, args :>> ', event, args);
    // });
  }, []);
  return (
    <Layout className={style.appcontainer}>
      <ConnectContainer />
    </Layout>
  );
}

export default App;
