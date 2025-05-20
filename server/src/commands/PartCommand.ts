import { Command } from './Command';
import WebSocket from 'ws';
import { roomService } from '../services/roomService';
import { normalizeRoomName } from '../../../shared/src/utils/normalizeRoomName';
import { sendError } from '../messageSenders/directMessageSender';
import {
    sendSystemBroadcast,
    sendUserRoomListBroadcast,
} from '../messageSenders/broadcastMessageSender';

export class PartCommand implements Command {
    readonly name = 'part';

    async execute(ws: WebSocket, args: string[]) {
        const room = normalizeRoomName(args[0]);
        if (!room) {
            return sendError(ws, 'Usage: /part #room');
        }
        await roomService.partRoom(ws, room);
        sendUserRoomListBroadcast();
    }
}

export function sendSystemLeftRoomMessage(nick: string, roomName: string) {
    sendSystemBroadcast(roomName, `${nick} has left ${roomName}`);
}
