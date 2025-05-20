import WebSocket from 'ws';
import {
    sendInfo,
    sendUserRoomList,
} from '../messageSenders/directMessageSender';
import { userService } from '../services/userService';
import { roomService } from '../services/roomService';
import { sendUserRoomListBroadcast } from '../messageSenders/broadcastMessageSender';
import { sendSystemLeftRoomMessage } from '../commands/PartCommand';

export function handleConnection(ws: WebSocket) {
    sendInfo(ws, 'Welcome to termirc! Please choose a nickname:');
    sendUserRoomList(ws, roomService.getUserRoomInfos(ws));
}

export function handleClose(ws: WebSocket) {
    partAllRooms(ws);
    userService.removeNickname(ws);
    console.log(`Client ${userService.getNickname(ws) ?? ''} disconnected`);
}

function partAllRooms(ws: WebSocket) {
    const userRooms = roomService.getUserRooms(ws);
    for (const room of userRooms) {
        roomService.partRoom(ws, room.name);
        sendSystemLeftRoomMessage(userService.getNickname(ws)!, room.name);
    }
    sendUserRoomListBroadcast();
}
