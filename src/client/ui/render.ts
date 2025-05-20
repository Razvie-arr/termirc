import { chatBox } from './panes';
import { screen } from './screen';

export function scrollBottom() {
    chatBox.setScrollPerc(100);
}

export function printSystem(text: string) {
    chatBox.pushLine(`{grey-fg}${text}{/}`);
    scrollBottom();
    screen.render();
}

export function printError(text: string) {
    chatBox.pushLine(`{red-fg}${text}{/}`);
    scrollBottom();
    screen.render();
}
