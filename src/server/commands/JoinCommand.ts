import { Command } from './Command';
import { roomService } from '../services/roomService';
import WebSocket from 'ws';
import { normalizeRoomName } from '../../shared/utils/normalizeRoomName';
import { sendError, sendInfo } from '../messageSenders/directMessageSender';
import { userService } from '../services/userService';
import { sendSystemBroadcast } from '../messageSenders/broadcaseMessageSender';

export class JoinCommand implements Command {
    name = 'join';
    execute(ws: WebSocket, args: string[]) {
        const room = normalizeRoomName(args[0]);
        if (!room) {
            return sendError(ws, 'Usage: /join #room');
        }
        roomService.joinRoom(ws, room);
        sendInfo(ws, `You joined ${room}`);

        const nick = userService.getNickname(ws)!;
        sendSystemBroadcast(room, `${nick} has joined ${room}`);
    }
}
