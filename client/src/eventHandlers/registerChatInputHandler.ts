import { input, roomList } from '../ui/panes';
import { ws } from '../client';
import { parseUserInput } from '../../../shared/src/utils/userInputParser';
import { MessageType } from '../../../shared/src/types/MessageType';
import { normalizeRoomName } from '../../../shared/src/utils/normalizeRoomName';
import { screen } from '../ui/screen';

export const registerChatInputHandler = () => {
    input.on('submit', (text) => {
        if (!text) return resetInput();
        ws.send(text);

        const parsed = parseUserInput(text);

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
};

function resetInput() {
    input.clearValue();
    input.focus();
    screen.render();
}
