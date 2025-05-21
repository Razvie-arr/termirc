import { Command } from './Command';
import WebSocket from 'ws';
import { roomService } from '../services/roomService';
import { normalizeRoomName } from '../../../shared/src/utils/normalizeRoomName';
import { sendError } from '../messageSenders/directMessageSender';
import {
    sendSystemBroadcast,
    sendUserRoomListBroadcast,
} from '../messageSenders/broadcastMessageSender';
import { userService } from '../services/userService';

export class PartCommand implements Command {
    readonly name = 'part';

    async execute(ws: WebSocket, args: string[]) {
        const room = normalizeRoomName(args[0]);
        if (!room) {
            return sendError(ws, 'Usage: /part #room');
        }
        await roomService.partRoom(ws, room);
        await sendUserRoomListBroadcast();
        await sendSystemLeftRoomMessage(userService.getNickname(ws)!, room);
    }
}

export async function sendSystemLeftRoomMessage(
    nick: string,
    roomName: string,
) {
    await sendSystemBroadcast(roomName, `${nick} has left ${roomName}`);
}
