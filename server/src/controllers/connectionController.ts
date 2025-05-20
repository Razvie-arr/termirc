import WebSocket from 'ws';
import {
    sendInfo,
    sendUserRoomList,
} from '../messageSenders/directMessageSender';
import { userService } from '../services/userService';
import { roomService } from '../services/roomService';

export function handleConnection(ws: WebSocket) {
    sendInfo(ws, 'Welcome to termirc! Please choose a nickname:');
    sendUserRoomList(ws, roomService.getUserRoomInfos(ws));
}

export function handleClose(ws: WebSocket) {
    userService.removeNickname(ws);
    console.log(`Client ${userService.getNickname(ws) ?? ''} disconnected`);
}
