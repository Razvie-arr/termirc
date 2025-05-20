import blessed from 'blessed';
import { screen } from './screen';

export const roomList = blessed.list({
    parent: screen,
    label: ' Rooms ',
    width: '20%',
    height: '90%',
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
    height: '90%',
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
    height: '10%',
    border: 'line',
    inputOnFocus: true,
    style: { focus: { border: { fg: 'green' } } },
});
