import { inputBox } from '../ui/panes';
import { parseUserInput } from '@shared/utils/userInputParser';
import { addRoom, removeRoom, switchRoom } from '../state/rooms';
import { MessageType } from '@shared/types/MessageType';
import { socket } from '../client';

inputBox.on('submit', (inputText) => {
    if (!inputText) return reset();
    socket.send(inputText);

    const parsed = parseUserInput(inputText);
    if (parsed.type === MessageType.Command) {
        switch (parsed.name) {
            case 'join':
                addRoom(parsed.args[0]);
                break;
            case 'part':
                removeRoom(parsed.args[0]);
                break;
            case 'switch':
                switchRoom(parsed.args[0]);
                break;
        }
    }
    reset();
});

function reset() {
    inputBox.clearValue();
    inputBox.focus();
}
