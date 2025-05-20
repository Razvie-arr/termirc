import { MessageType } from '../../../../shared/src/types/MessageType';
import { chatBox } from '../../ui/panes';
import { screen } from '../../ui/screen';

const styleByType: Partial<Record<MessageType, string>> = {
    [MessageType.System]: '{magenta-fg}[system · everyone]{/} ',
    [MessageType.Info]: '{cyan-fg}[info · just you]{/} ',
    [MessageType.Error]: '{red-fg}[error]{/} ',
};

export const handleServerMessage = (msg: any) => {
    const prefix = styleByType[msg.type as MessageType] ?? '';
    chatBox.pushLine(`${prefix}${msg.payload}`);

    chatBox.setScrollPerc(100);
    screen.render();
};
