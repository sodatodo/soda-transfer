import WebSocket from 'ws';
import { openListener, messageListener } from './listeners';

const wss = new WebSocket('wss://192.168.0.119:8080');

wss.on('open', openListener);
wss.on('message', messageListener);
