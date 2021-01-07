import React, { useEffect } from 'react';
import rpc from '../../utils/rpc';

const MessageListener = () => {
  useEffect(() => {
    console.log('set rpc listener');
    rpc.on('on-get-remote-offer-desc', async (message) => {
      console.log('message :>> ', message);
    });
  }, []);
  return (<div> </div>);
};

export default MessageListener;
