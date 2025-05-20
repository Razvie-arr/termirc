import blessed from 'blessed';

export const terminalScreen = blessed.screen({
    smartCSR: true,
    title: 'Termirc',
});
