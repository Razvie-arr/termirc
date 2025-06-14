import { Command } from './Command';
import WebSocket from 'ws';
import { roomService } from '../services/roomService';
import { normalizeRoomName } from '../../../shared/src/utils/normalizeRoomName';
import {
    sendActiveRoom,
    sendError,
    sendInfo,
} from '../messageSenders/directMessageSender';

export class SwitchCommand implements Command {
    readonly name = 'switch';

    async execute(ws: WebSocket, args: string[]) {
        const roomName = normalizeRoomName(args[0]);
        if (!roomName) {
            return sendError(ws, 'Usage: /switch #room');
        }
        if (!(await roomService.switchRoom(ws, roomName))) {
            return sendError(ws, `You’re not in ${roomName}.`);
        }
        sendInfo(ws, `Active room set to ${roomName}`);
        sendActiveRoom(ws, roomName);
    }
}
