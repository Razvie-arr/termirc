import { terminalInput } from '../../ui/panes';
import { ws } from '../../client';
import { clearChat } from '../../ui/actions/clearChat';
import { resetInput } from '../../ui/actions/resetInput';

export const registerChatInputHandler = () => {
    terminalInput.on('submit', (text) => {
        if (!text) return resetInput();
        if (text.trim() === '/clear') return clearChat();
        ws.send(text);
        resetInput();
    });
};
