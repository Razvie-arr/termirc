import './ui/screen';
import './ui/panes';
import './ws/socket';
import './ws/handlers';
import './input/handler';
import { screen } from './ui/screen';
import WebSocket from 'ws';
import { MessageType } from '@shared/types/MessageType';
import { printError, printSystem } from './ui/render';
import { activeRoom } from './utils/activeRoom';
import { chatBox } from './ui/panes';

export const socket = new WebSocket('ws://localhost:8080');
socket.on('message', (raw) => {
    const msg = JSON.parse(raw.toString());

    switch (msg.type) {
        case MessageType.System:
        case MessageType.Info:
        case MessageType.Error:
            printError(msg.payload);
            break;

        case MessageType.Message:
            if (msg.room === activeRoom()) {
                chatBox.pushLine(`[${msg.from}] ${msg.payload}`);
                printSystem('');
            }
            break;
    }
});

screen.render();
