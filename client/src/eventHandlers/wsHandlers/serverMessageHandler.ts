import { MessageType } from '../../../../shared/src/types/MessageType';
import { terminalChatBox } from '../../ui/panes';
import { terminalScreen } from '../../ui/terminalScreen';

const styleByType: Partial<Record<MessageType, string>> = {
    [MessageType.System]: '{magenta-fg}[system · everyone]{/} ',
    [MessageType.Info]: '{cyan-fg}[info · just you]{/} ',
    [MessageType.Error]: '{red-fg}[error]{/} ',
};

export const handleServerMessage = (msg: any) => {
    const prefix = styleByType[msg.type as MessageType] ?? '';
    terminalChatBox.pushLine(`${prefix}${msg.payload}`);

    terminalChatBox.setScrollPerc(100);
    terminalScreen.render();
};
