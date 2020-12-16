import { BrowserWindow } from 'electron';

const path = require('path');
const os = require('os');
// const fs = require('fs');

export default {};
const DEV_TOOLS_PATH = '/Library/Application support/Google/Chrome/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/2.17.0_0';

export const loadDevTools = () => {
  console.log('read dev tools dir');
  //   const devtoolspath = path.join(os.homedir(), DEV_TOOLS_PATH);
  BrowserWindow.addDevToolsExtension(path.join(os.homedir(), `${DEV_TOOLS_PATH}`));
  //   fs.readdir(devtoolspath, (err: Error, devtoolfolders: string[]): void => {
  //     if (err) {
  //       return console.log('文件夹不存在');
  //     }
  //     devtoolfolders.forEach((devtoolfolder: string) => {
  //     //   console.log('devtoolfolder :>> ', devtoolfolder);

//     });
//   });
};
