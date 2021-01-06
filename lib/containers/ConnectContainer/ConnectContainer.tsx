/* eslint-disable no-underscore-dangle */
import React, { useEffect, useRef, useState } from 'react';
import { Button, List, Typography } from 'antd';
import rpc from '../../utils/rpc';
import { WebRTCDataChannelClient } from '../../webrtc';

function ConnectContainer({
  onSetLocalDescription,
  onGetRemoteDescription,
  onGetAnswerDescription,
  onSetClientType,
  clientType: currentClientType,
}: {
  onSetLocalDescription: any,
  onGetRemoteDescription: any,
  onGetAnswerDescription: any,
  onSetClientType: any,
  clientType: string,
}) {
  const [clients, setClients] = useState([]);
  const refClientType = useRef(currentClientType);
  useEffect(() => {
    refClientType.current = currentClientType;
  }, [currentClientType]);

  const dataChannelClient = new WebRTCDataChannelClient();

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
    rpc.on('on-get-remote-offer-desc', async (message) => {
      console.log('message :>> ', message);
      const { desc, clientType, fromId } = message;
      if (clientType === 'caller') {
        onSetClientType('callee');
        onGetRemoteDescription(desc);
        const answerDescription = await dataChannelClient.setRemoteDescriptionAndCreateAnswer(
          desc,
        );
        dataChannelClient.setLocalDescription(answerDescription);
        onSetLocalDescription(answerDescription);

        rpc.emit('websocket-message', {
          type: 'swap-offer-desc',
          clientType: 'callee',
          targetId: fromId,
          data: {
            description: JSON.stringify(answerDescription),
          },
        });
      }
      if (clientType === 'callee') {
        // console.log('from callee desc :>> ', desc);
        onGetRemoteDescription(desc);
        dataChannelClient.setRemoteDescription(desc);
      }
    });

    dataChannelClient.createDataChannel();
    dataChannelClient.setIceCandidateListener((ev: RTCPeerConnectionIceEvent) => {
      // console.log('sodalog ev.candidate :>> ', ev.candidate);
      if (ev.candidate) {
        console.log('ev.candidate :>> ', ev.candidate);
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
  const handleSendLocalOfferDesc = (item: any) => {
    dataChannelClient.createOffer((desc: RTCSessionDescriptionInit) => {
      dataChannelClient.setLocalDescription(desc);
      onSetLocalDescription(desc);
      onSetClientType('caller');
      rpc.emit('websocket-message', {
        type: 'swap-offer-desc',
        clientType: 'caller',
        targetId: item.id,
        data: {
          description: JSON.stringify(desc),
        },
      });
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
