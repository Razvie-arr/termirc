import blessed, { Widgets } from 'blessed';
import { terminalScreen } from './terminalScreen';
import BoxElement = Widgets.BoxElement;
import ListElement = Widgets.ListElement;
import TextboxElement = Widgets.TextboxElement;

const INPUT_HEIGHT = 3;

export const roomList: ListElement = blessed.list({
    parent: terminalScreen,
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

export const terminalChatBox: BoxElement = blessed.box({
    parent: terminalScreen,
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

export const terminalInput: TextboxElement = blessed.textbox({
    parent: terminalScreen,
    bottom: 0,
    left: 0,
    width: '100%',
    height: INPUT_HEIGHT,
    border: 'line',
    inputOnFocus: true,
    style: { focus: { border: { fg: 'green' } } },
});
