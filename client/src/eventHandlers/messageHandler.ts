import { RawData } from 'ws';
import { MessageType } from '../../../shared/src/types/MessageType';
import { chatBox } from '../ui/panes';
import { activeRoom } from '../utils/activeRoom';
import { screen } from '../ui/screen';

const styleByType: Partial<Record<MessageType, string>> = {
    [MessageType.System]: '{magenta-fg}[system · everyone]{/} ',
    [MessageType.Info]: '{cyan-fg}[info · just you]{/} ',
    [MessageType.Error]: '{red-fg}[error]{/} ',
};

export const handleMessage = (raw: RawData) => {
    const msg = JSON.parse(raw.toString());

    if (
        msg.type === MessageType.System ||
        msg.type === MessageType.Info ||
        msg.type === MessageType.Error
    ) {
        const prefix = styleByType[msg.type as MessageType] ?? '';
        chatBox.pushLine(`${prefix}${msg.payload}`);
    }
    if (msg.type === MessageType.Message && msg.room === activeRoom()) {
        chatBox.pushLine(
            `{gray-fg}[${msg.room}]{/} {blue-fg}${msg.from}:{/} ${msg.payload}`,
        );
    }

    chatBox.setScrollPerc(100);
    screen.render();
};
