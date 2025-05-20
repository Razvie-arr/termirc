import { chatBox } from '../../ui/panes';
import { screen } from '../../ui/screen';

export const handleUserMessage = (msg: any) => {
    chatBox.pushLine(
        `{gray-fg}[${msg.room}]{/} {blue-fg}${msg.from}:{/} ${msg.payload}`,
    );
    chatBox.setScrollPerc(100);
    screen.render();
};
