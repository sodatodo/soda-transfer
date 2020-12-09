import React from 'react';
import { Button } from 'antd';

function App() {
  return (
    <div>
      <ul>
        <li>
          node-version:
          {/* {process.versions.node} */}
          <Button type="primary">Hello</Button>
        </li>
        <li>
          chrome-version:
          {/* {process.versions.chrome} */}
        </li>
        <li>
          electron-version:
          {/* {process.versions.electron} */}
        </li>
      </ul>
    </div>
  );
}

export default App;
