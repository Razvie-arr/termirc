import blessed from 'blessed';
import { screen } from './screen';

const INPUT_HEIGHT = 3;

export const roomList = blessed.list({
    parent: screen,
    label: ' My Rooms ',
    width: '20%',
    height: `100%-${INPUT_HEIGHT}`,
    top: 0,
    left: 0,
    border: 'line',
    keys: true,
    mouse: true,
    style: { selected: { bg: 'blue' } },
});

export const chatBox = blessed.box({
    parent: screen,
    label: ' Chat ',
    width: '80%',
    height: `100%-${INPUT_HEIGHT}`,
    top: 0,
    left: '20%',
    border: 'line',
    scrollable: true,
    alwaysScroll: true,
    tags: true,
    scrollbar: {
        ch: ' ',
        track: { bg: 'grey' },
        style: { inverse: true },
    },
});

export const input = blessed.textbox({
    parent: screen,
    bottom: 0,
    left: 0,
    width: '100%',
    height: INPUT_HEIGHT,
    border: 'line',
    inputOnFocus: true,
    style: { focus: { border: { fg: 'green' } } },
});
