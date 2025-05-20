import { terminalChatBox } from '../panes';
import { resetInput } from './resetInput';

export function clearChat() {
    terminalChatBox.setContent('');
    terminalChatBox.setScrollPerc(100);
    resetInput();
}
