import React, { useEffect } from 'react';
import rpc from '../../utils/rpc';

const MessageListener = ({ setRemoteDesc }: { setRemoteDesc: any }) => {
  useEffect(() => {
    console.log('set rpc listener');
    rpc.on('on-get-remote-offer-desc', async (message) => {
      // console.log('message :>> ', message);
      setRemoteDesc(message);
    });
  }, []);
  return (<div> </div>);
};

export default MessageListener;
