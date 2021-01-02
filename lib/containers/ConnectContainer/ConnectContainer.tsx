import React, { useEffect } from 'react';
import { Button } from 'antd';
import rpc from '../../utils/rpc';

function ConnectContainer() {
  useEffect(() => {
    rpc.on('get-local-network-info', (data) => {
      console.log('data :>> ', data);
    });
    rpc.on('get-remote-server-state', (result) => {
      console.log('result :>> ', result);
    });
    rpc.on('get-arp-info', (arpInfoSet) => {
      if (arpInfoSet instanceof Set) {
        console.log('sodalog Array.from(arpInfoSet) :>> ', Array.from(arpInfoSet));
      }
    });
  }, []);
  const handleSend = () => {
    rpc.emit('get-local-network-info', null);
  };
  const handleGetArp = () => {
    rpc.emit('get-arp-info', null);
  };
  const handleGetServerState = () => {
    rpc.emit('get-remote-server-state', null);
  };
  return (
    <div>
      ConnectContainer
      <Button onClick={handleSend}>get local network info</Button>
      <Button onClick={handleGetArp}>get arp info</Button>
      <Button onClick={handleGetServerState}>get remove info</Button>
    </div>
  );
}

export default ConnectContainer;
