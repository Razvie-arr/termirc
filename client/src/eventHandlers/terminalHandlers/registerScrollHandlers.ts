import { terminalChatBox, terminalInput } from '../../ui/panes';
import { terminalScreen } from '../../ui/terminalScreen';

export function registerScrollHandlers() {
    terminalInput.key(['up'], () => {
        terminalChatBox.scroll(-1);
        terminalScreen.render();
    });
    terminalInput.key(['down'], () => {
        terminalChatBox.scroll(1);
        terminalScreen.render();
    });
}
