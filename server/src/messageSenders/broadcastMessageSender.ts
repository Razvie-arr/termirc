import { MessageType } from '../../../shared/src/types/MessageType';
import { roomService } from '../services/roomService';
import { Room } from '../../../shared/src/types/Room';
import { RoomInfo } from '../../../shared/src/types/RoomInfo';
import { wss } from '../server';
import { RoomListPayload } from '../../../shared/src/types/RoomListPayload';

export function sendSystemBroadcast(roomName: string, text: string) {
    const message = JSON.stringify({
        type: MessageType.System,
        roomName: roomName,
        payload: text,
    });
    sendMessageToRoom(roomService.getRoom(roomName)!, message);
}

export function sendChatMessageBroadcast(
    roomName: string,
    from: string,
    text: string,
) {
    const message = JSON.stringify({
        type: MessageType.Message,
        roomName: roomName,
        from,
        payload: text,
    });
    sendMessageToRoom(roomService.getRoom(roomName)!, message);
}

export function sendUserRoomListBroadcast() {
    wss.clients.forEach((ws) => {
        const roomInfos: RoomInfo[] = roomService.getUserRoomInfos(ws);
        const payload: RoomListPayload = {
            type: MessageType.RoomList,
            rooms: roomInfos,
        };
        const json = JSON.stringify(payload);
        if (ws.readyState === ws.OPEN) ws.send(json);
    });
}

function sendMessageToRoom(room: Room, message: string) {
    room.members.forEach((member) => {
        if (member.readyState === member.OPEN) {
            member.send(message);
        }
    });
}
