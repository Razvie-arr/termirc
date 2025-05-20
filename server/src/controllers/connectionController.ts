import WebSocket from 'ws';
import { sendInfo } from '../messageSenders/directMessageSender';
import { userService } from '../services/userService';

export function handleConnection(ws: WebSocket) {
    sendInfo(ws, 'Welcome to termirc! Please choose a nickname:');
}

export function handleClose(ws: WebSocket) {
    userService.removeNickname(ws);
    console.log(`Client ${userService.getNickname(ws) ?? ''} disconnected`);
}
