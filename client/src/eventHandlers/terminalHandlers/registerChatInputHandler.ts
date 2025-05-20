import { input } from '../../ui/panes';
import { ws } from '../../client';
import { screen } from '../../ui/screen';

export const registerChatInputHandler = () => {
    input.on('submit', (text) => {
        if (!text) return resetInput();
        ws.send(text);
        resetInput();
    });
};

function resetInput() {
    input.clearValue();
    input.focus();
    screen.render();
}
