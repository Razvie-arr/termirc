import { terminalChatBox } from '../../ui/panes';
import { terminalScreen } from '../../ui/terminalScreen';

export const handleUserMessage = (msg: any) => {
    terminalChatBox.pushLine(
        `{gray-fg}[${msg.roomName}]{/} {blue-fg}${msg.from}:{/} ${msg.payload}`,
    );
    terminalChatBox.setScrollPerc(100);
    terminalScreen.render();
};
