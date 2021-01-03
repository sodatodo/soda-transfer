import React, { useEffect, useState } from 'react';
import { Button, List, Typography } from 'antd';
import rpc from '../../utils/rpc';
import { WebRTCDataChannelClient } from '../../webrtc';

function ConnectContainer() {
  const [clients, setClients] = useState([]);
  const [localOfferDescription, setLocalOfferDescription] = useState({});
  useEffect(() => {
    rpc.on('get-local-network-info', (data: any) => {
      console.log('data :>> ', data);
    });
    rpc.on('get-remote-server-state', (result) => {
      console.log('result :>> ', result);
      // const currentClients = result.map((item: any) => item.remoteAddress);
      setClients(result);
    });
    rpc.on('get-arp-info', (arpInfoSet) => {
      if (arpInfoSet instanceof Set) {
        console.log('sodalog Array.from(arpInfoSet) :>> ', Array.from(arpInfoSet));
      }
    });
    const dataChannelClient = new WebRTCDataChannelClient();
    rpc.on('on-get-remote-offer-desc', async (message) => {
      console.log('on-get-remote-offer-desc message :>> ', message);
      const { desc, clientType } = message;
      // console.log('message :>> ', message);
      if (clientType === 'caller') {
        const answerDescription = await dataChannelClient.setRemoteDescriptionAndCreateAnswer(
          JSON.parse(desc),
        );
        rpc.emit('swap-offer-desc', {
          type: 'callee',
          id: message.fromId,
          desc: JSON.stringify(answerDescription),
        });
      } else if (clientType === 'callee') {
        // console.log('from callee desc :>> ', desc);
        dataChannelClient.setRemoteDescription(JSON.parse(desc));
      }
      // answer.then(
      //   (answerdesc: RTCSessionDescriptionInit) => {
      //     console.log('answerdesc :>> ', answerdesc);
      //   },
      //   (error) => {
      //     console.log('error :>> ', error);
      //   },
      // );
    });

    dataChannelClient.createDataChannel();
    dataChannelClient.createOffer((desc: RTCSessionDescriptionInit) => {
      console.log('desc :>> ', desc);
      setLocalOfferDescription(desc);
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
  const handleSendLocalOfferDesc = (item: any) => {
    console.log('item :>> ', item);
    console.log('localOfferDescription :>> ', localOfferDescription);
    rpc.emit('swap-offer-desc', {
      type: 'caller',
      id: item.id,
      desc: JSON.stringify(localOfferDescription),
    });
  };
  return (
    <div>
      ConnectContainer
      <Button onClick={handleSend}>get local network info</Button>
      <Button onClick={handleGetArp}>get arp info</Button>
      <Button onClick={handleGetServerState}>get remove info</Button>

      <List
        // header={<div>Header</div>}
        // footer={<div>Footer</div>}
        bordered
        dataSource={clients}
        renderItem={(item: any) => (
          <List.Item onClick={() => handleSendLocalOfferDesc(item)}>
            <Typography.Text mark>[ITEM]</Typography.Text>
            {' '}
            {item.remoteAddress}
          </List.Item>
        )}
      />

      <textarea />
    </div>
  );
}

export default ConnectContainer;
