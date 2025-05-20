import { chatBox } from '../../ui/panes';
import { screen } from '../../ui/screen';

export const handleOpen = () => {
    chatBox.pushLine('{grey-fg}Connected. Waiting for server…{/}');
    screen.render();
};

export const handleClose = () => {
    chatBox.pushLine('{red-fg}Disconnected from server{/}');
    screen.render();
};
