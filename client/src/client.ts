import './ui/screen';
import './ui/panes';
import { screen } from './ui/screen';
import { chatBox, input, roomList } from './ui/panes';
import WebSocket from 'ws';
import { MessageType } from '../../shared/src/types/MessageType';
import { activeRoom } from './utils/activeRoom';
import { parseUserInput } from '../../shared/src/utils/userInputParser';
import { normalizeRoomName } from '../../shared/src/utils/normalizeRoomName';

input.focus();
screen.key(['C-c'], () => process.exit(0));
screen.render();

export const ws = new WebSocket('ws://localhost:8080');

ws.on('open', () => {
    chatBox.pushLine('{grey-fg}Connected. Waiting for server…{/}');
    screen.render();
});

ws.on('message', (raw) => {
    const msg = JSON.parse(raw.toString());

    if (
        msg.type === MessageType.System ||
        msg.type === MessageType.Info ||
        msg.type === MessageType.Error
    ) {
        chatBox.pushLine(`{grey-fg}${msg.payload}{/}`);
    }

    // chat lines only for active room
    if (msg.type === MessageType.Message && msg.room === activeRoom()) {
        chatBox.pushLine(`[${msg.from}] ${msg.payload}`);
    }

    chatBox.setScrollPerc(100);
    screen.render();
});

ws.on('close', () => {
    chatBox.pushLine('{red-fg}Disconnected from server{/}');
    screen.render();
});

input.on('submit', (txt) => {
    if (!txt) return resetInput();
    ws.send(txt);

    const parsed = parseUserInput(txt);

    if (parsed.type === MessageType.Command) {
        const [arg] = parsed.args;
        switch (parsed.name) {
            case 'join': {
                const room = normalizeRoomName(arg);
                if (room && roomList.getItemIndex(room) === -1) {
                    roomList.addItem(room);

                    const roomIndex = roomList.getItemIndex(room);
                    roomList.select(roomIndex);
                }
                break;
            }
            case 'part': {
                const idx = roomList.getItemIndex(arg);
                if (idx >= 0) roomList.removeItem(idx);
                break;
            }
            case 'switch': {
                const idx = roomList.getItemIndex(arg);
                if (idx >= 0) roomList.select(idx);
                break;
            }
        }
    }

    resetInput();
});

function resetInput() {
    input.clearValue();
    input.focus();
    screen.render();
}
