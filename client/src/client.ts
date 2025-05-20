import { screen } from './ui/screen';
import { input } from './ui/panes';
import WebSocket from 'ws';
import { handleClose, handleOpen } from './eventHandlers/connectionHandlers';
import { handleMessage } from './eventHandlers/messageHandler';
import { registerChatInputHandler } from './eventHandlers/registerChatInputHandler';

registerChatInputHandler();

input.focus();
screen.render();

export const ws = new WebSocket('ws://localhost:8080');

ws.on('open', () => {
    handleOpen();
});

ws.on('message', (raw) => {
    handleMessage(raw);
});

ws.on('close', () => {
    handleClose();
});
