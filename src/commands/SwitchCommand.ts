import { Command } from './Command';
import WebSocket from 'ws';
import { roomService } from '../services/roomService';
import { normalizeRoomName } from '../utils/normalizeRoomName';
import { sendError, sendInfo } from '../messageSenders/directMessageSender';

export class SwitchCommand implements Command {
    readonly name = 'switch';

    execute(ws: WebSocket, args: string[]): void {
        const room = normalizeRoomName(args[0]);
        if (!room) {
            return sendError(ws, 'Usage: /switch #room');
        }
        if (!roomService.switchRoom(ws, room)) {
            return sendError(ws, `You’re not in ${room}.`);
        }
        sendInfo(ws, `Active room set to ${room}`);
    }
}
