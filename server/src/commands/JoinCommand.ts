import { Command } from './Command';
import { roomService } from '../services/roomService';
import WebSocket from 'ws';
import { normalizeRoomName } from '../../../shared/src/utils/normalizeRoomName';
import {
    sendActiveRoom,
    sendError,
    sendInfo,
} from '../messageSenders/directMessageSender';
import { userService } from '../services/userService';
import {
    sendSystemBroadcast,
    sendUserRoomListBroadcast,
} from '../messageSenders/broadcastMessageSender';

export class JoinCommand implements Command {
    name = 'join';
    execute(ws: WebSocket, args: string[]) {
        const room = normalizeRoomName(args[0]);
        if (!room) {
            return sendError(ws, 'Usage: /join #room');
        }
        roomService.joinRoom(ws, room);
        sendInfo(ws, `You joined ${room}`);

        executeAfterJoinActivities(ws, room);
    }
}

const executeAfterJoinActivities = (ws: WebSocket, roomName: string) => {
    const nick = userService.getNickname(ws)!;
    sendSystemBroadcast(roomName, `${nick} has joined ${roomName}`);
    sendActiveRoom(ws, roomName);
    sendUserRoomListBroadcast();
};
