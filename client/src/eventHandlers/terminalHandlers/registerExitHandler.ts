import { terminalInput } from '../../ui/panes';

export function registerExitHandler() {
    terminalInput.key(['escape', 'C-c'], () => process.exit(0));
}
