import blessed from 'blessed';
import { screen } from './screen';

export const roomList = blessed.list({ parent: screen });
export const chatBox = blessed.box({ parent: screen });
export const inputBox = blessed.textbox({ parent: screen });

inputBox.focus();
screen.render();
