import { terminalScreen } from './ui/terminalScreen';
import { terminalInput } from './ui/panes';
import WebSocket from 'ws';
import {
    handleClose,
    handleOpen,
} from './eventHandlers/wsHandlers/connectionHandlers';
import { registerChatInputHandler } from './eventHandlers/terminalHandlers/registerChatInputHandler';
import { wsHandlers } from './eventHandlers/wsHandlers/wsHandlers';
import { MessageType } from '../../shared/src/types/MessageType';
import { registerScrollHandlers } from './eventHandlers/terminalHandlers/registerScrollHandlers';
import { registerExitHandler } from './eventHandlers/terminalHandlers/registerExitHandler';

registerChatInputHandler();
registerExitHandler();
registerScrollHandlers();

terminalInput.focus();
terminalScreen.render();

export const ws = new WebSocket('ws://localhost:8080');

ws.on('open', () => {
    handleOpen();
});

ws.on('message', (raw) => {
    const msg = JSON.parse(raw.toString());
    const handler = wsHandlers[msg.type as MessageType];
    if (handler) {
        handler(msg);
    } else {
        console.warn('Unhandled message type:', msg.type);
    }
});

ws.on('close', () => {
    handleClose();
});
