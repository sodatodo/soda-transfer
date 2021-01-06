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
  const [localOfferDescription, setLocalOfferDescription] = useState({});
  const refClientType = useRef(currentClientType);
  useEffect(() => {
    refClientType.current = currentClientType;
  }, [currentClientType]);
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
      const { desc, clientType, fromId } = message;
      if (clientType === 'caller' && refClientType.current === 'caller') {
        console.log('caller客户端应获取来自 callee客户端的 description ');
        return;
      }
      // console.log('message :>> ', message);
      if (clientType === 'caller') {
        onGetRemoteDescription(desc);
        const answerDescription = await dataChannelClient.setRemoteDescriptionAndCreateAnswer(
          desc,
        );
        onGetAnswerDescription(answerDescription);
        rpc.emit('websocket-message', {
          type: 'swap-offer-desc',
          clientType: 'callee',
          targetId: fromId,
          data: {
            description: JSON.stringify(answerDescription),
          },
        });
        // rpc.emit('swap-offer-desc', {
        //   type: 'callee',
        //   id: message.fromId,
        //   desc: JSON.stringify(answerDescription),
        // });
      } else if (clientType === 'callee') {
        // console.log('from callee desc :>> ', desc);
        dataChannelClient.setRemoteDescription(desc);
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
    onSetLocalDescription(localOfferDescription);
    onSetClientType('caller');
    rpc.emit('websocket-message', {
      type: 'swap-offer-desc',
      clientType: 'caller',
      targetId: item.id,
      data: {
        description: JSON.stringify(localOfferDescription),
      },
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
