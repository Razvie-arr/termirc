// /**
//  * Termirc – blessed client
//  * Run with:  ts-node src/client.ts  (or compile & node dist/client.js)
//  */
// import blessed from 'blessed';
// import WebSocket from 'ws';
// import { MessageType } from './types/messageTypes';
// import { parseUserInput } from './utils/userInputParser';
// import { normalizeRoomName } from './utils/roomName';
//
// // ──────────────────────────── UI BOOTSTRAP ────────────────────────────
// const screen = blessed.screen({ smartCSR: true, title: 'Termirc' });
//
// // Sidebar: joined rooms list
// const roomList = blessed.list({
//     parent: screen,
//     label: ' Rooms ',
//     width: '20%',
//     height: '90%',
//     top: 0,
//     left: 0,
//     border: 'line',
//     keys: true,
//     mouse: true,
//     style: { selected: { bg: 'blue' } },
// });
//
// // Main chat pane
// const chatBox = blessed.box({
//     parent: screen,
//     label: ' Chat ',
//     width: '80%',
//     height: '90%',
//     top: 0,
//     left: '20%',
//     border: 'line',
//     scrollable: true,
//     alwaysScroll: true,
//     tags: true,
//     scrollbar: {
//         ch: ' ',
//         track: { bg: 'grey' },
//         style: { inverse: true },
//     },
// });
//
// // Input line
// const input = blessed.textbox({
//     parent: screen,
//     bottom: 0,
//     left: 0,
//     width: '100%',
//     height: '10%',
//     border: 'line',
//     inputOnFocus: true,
//     style: { focus: { border: { fg: 'green' } } },
// });
//
// input.focus();
// screen.key(['C-c'], () => process.exit(0));
// screen.render();
//
// // Helper: current active room name (undefined if none)
// function activeRoom(): string | undefined {
//     const idx = (roomList as any).selected as number | undefined;
//     return typeof idx === 'number' ? roomList.getItem(idx)?.content : undefined;
// }
//
// // ──────────────────────────── WEBSOCKET SETUP ─────────────────────────
// const ws = new WebSocket('ws://localhost:8080');
//
// ws.on('open', () => {
//     chatBox.pushLine('{grey-fg}Connected. Waiting for server…{/}');
//     screen.render();
// });
//
// ws.on('message', (raw) => {
//     const msg = JSON.parse(raw.toString());
//
//     // system/info/error lines
//     if (
//         msg.type === MessageType.System ||
//         msg.type === MessageType.Info ||
//         msg.type === MessageType.Error
//     ) {
//         chatBox.pushLine(`{grey-fg}${msg.payload}{/}`);
//     }
//
//     // chat lines only for active room
//     if (msg.type === MessageType.Message && msg.room === activeRoom()) {
//         chatBox.pushLine(`[${msg.from}] ${msg.payload}`);
//     }
//
//     chatBox.setScrollPerc(100);
//     screen.render();
// });
//
// ws.on('close', () => {
//     chatBox.pushLine('{red-fg}Disconnected from server{/}');
//     screen.render();
// });
//
// // ──────────────────────────── INPUT HANDLER ───────────────────────────
// input.on('submit', (txt) => {
//     if (!txt) return resetInput();
//
//     // Local helper: quick /rooms to select first room
//     if (txt.trim() === '/rooms') {
//         if (roomList.items.length) roomList.select(0);
//         return resetInput();
//     }
//
//     // Send raw to server
//     ws.send(txt);
//     const parsed = parseUserInput(txt);
//
//     // Locally mutate sidebar on join/part/switch
//     if (parsed.type === MessageType.Command) {
//         const [arg] = parsed.args;
//         switch (parsed.name) {
//             case 'join': {
//                 const room = normalizeRoomName(arg);
//                 if (room && roomList.getItemIndex(room) === -1) {
//                     roomList.addItem(room);
//                     roomList.select(roomList.items.length - 1);
//                 }
//                 break;
//             }
//             case 'part': {
//                 const idx = roomList.getItemIndex(arg);
//                 if (idx >= 0) roomList.removeItem(idx);
//                 break;
//             }
//             case 'switch': {
//                 const idx = roomList.getItemIndex(arg);
//                 if (idx >= 0) roomList.select(idx);
//                 break;
//             }
//         }
//     }
//
//     resetInput();
// });
//
// function resetInput() {
//     input.clearValue();
//     input.focus();
//     screen.render();
// }
//
// // Clicking on a room switches active room
// roomList.on('select', () => {
//     chatBox.setContent(''); // client-side history reset per room view
//     screen.render();
// });
