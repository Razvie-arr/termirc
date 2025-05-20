import { terminalChatBox } from '../../ui/panes';
import { terminalScreen } from '../../ui/terminalScreen';

export const handleUserMessage = (msg: any) => {
    printUserMessage(msg.roomName, msg.from, msg.payload);
};

export const printUserMessage = (
    roomName: string,
    from: string,
    body: string,
) => {
    terminalChatBox.pushLine(
        `{gray-fg}[${roomName}]{/} {blue-fg}${from}:{/} ${body}`,
    );
    terminalChatBox.setScrollPerc(100);
    terminalScreen.render();
};
