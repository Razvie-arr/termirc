import WebSocket from 'ws';
import {
    sendInfo,
    sendUserRoomList,
} from '../messageSenders/directMessageSender';
import { userService } from '../services/userService';
import { roomService } from '../services/roomService';
import { sendUserRoomListBroadcast } from '../messageSenders/broadcastMessageSender';
import { sendSystemLeftRoomMessage } from '../commands/PartCommand';

export async function handleConnection(ws: WebSocket) {
    sendInfo(ws, 'Welcome to termirc! Please choose a nickname:');
    sendUserRoomList(ws, await roomService.getUserRoomInfos(ws));
}

export async function handleClose(ws: WebSocket) {
    await partAllRooms(ws);
    userService.removeNickname(ws);
    console.log(`Client ${userService.getNickname(ws) ?? ''} disconnected`);
}

async function partAllRooms(ws: WebSocket) {
    const userRooms = await roomService.getUserRooms(ws);
    for (const room of userRooms) {
        await roomService.partRoom(ws, room.name);
        sendSystemLeftRoomMessage(userService.getNickname(ws)!, room.name);
    }
    await sendUserRoomListBroadcast();
}
