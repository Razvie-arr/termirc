import blessed from 'blessed';

export const screen = blessed.screen({ smartCSR: true, title: 'Termirc' });
screen.key(['escape', 'C-c'], () => process.exit(0));
