import { terminalChatBox } from '../../ui/panes';
import { terminalScreen } from '../../ui/terminalScreen';

export const handleOpen = () => {
    terminalChatBox.pushLine('{grey-fg}Connected. Waiting for server…{/}');
    terminalScreen.render();
};

export const handleClose = () => {
    terminalChatBox.pushLine('{red-fg}Disconnected from server{/}');
    terminalScreen.render();
};
