import { Command } from './Command';
import WebSocket from 'ws';
import { roomService } from '../services/roomService';
import { sendInfo } from '../messageSenders/directMessageSender';
import { RoomInfo } from '../../../shared/src/types/RoomInfo';

export class ListCommand implements Command {
    readonly name = 'list';

    async execute(ws: WebSocket, _args: string[]) {
        const roomsInfos: RoomInfo[] = await roomService.getAllRoomInfos();
        if (roomsInfos.length === 0) {
            return sendInfo(ws, 'No rooms available.');
        }
        for (const roomInfo of roomsInfos) {
            const memberCount = roomInfo.memberCount;
            sendInfo(
                ws,
                `${roomInfo.name} — ${memberCount} user${memberCount !== 1 ? 's' : ''}`,
            );
        }
    }
}
