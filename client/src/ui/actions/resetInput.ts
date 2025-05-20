import { terminalInput } from '../panes';
import { terminalScreen } from '../terminalScreen';

export function resetInput() {
    terminalInput.clearValue();
    terminalInput.focus();
    terminalScreen.render();
}
