import React from 'react';
import { Layout } from 'antd';
// import { AppleFilled } from '@ant-design/icons';
import { ConnectContainer } from '../containers';
import style from './style.module.less';

function App() {
  // console.log('electron.ipcRenderer :>> ', electron.ipcRenderer);
  // electron.ipcRenderer.on('hello', (ev) => {
  //   console.log('ev :>> ', ev);
  // });
  return (
    <Layout className={style.appcontainer}>
      <ConnectContainer />
    </Layout>
  );
}

export default App;
