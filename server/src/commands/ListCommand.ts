import { Command } from './Command';
import WebSocket from 'ws';
import { roomService } from '../services/roomService';
import { sendInfo } from '../messageSenders/directMessageSender';

export class ListCommand implements Command {
    readonly name = 'list';

    execute(ws: WebSocket, _args: string[]): void {
        const rooms = roomService.getAllRooms();
        if (rooms.length === 0) {
            return sendInfo(ws, 'No rooms available.');
        }
        for (const { name, memberCount } of rooms) {
            sendInfo(
                ws,
                `${name} — ${memberCount} user${memberCount !== 1 ? 's' : ''}`,
            );
        }
    }
}
