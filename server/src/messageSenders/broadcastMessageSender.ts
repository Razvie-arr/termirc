import { MessageType } from '../../../shared/src/types/MessageType';
import { roomService } from '../services/roomService';
import { Room } from '../../../shared/src/types/Room';
import { RoomInfo } from '../../../shared/src/types/RoomInfo';
import { wss } from '../server';
import { RoomListPayload } from '../../../shared/src/types/RoomListPayload';
import { addMessage } from '../db/messages';

export async function sendSystemBroadcast(roomName: string, text: string) {
    const message = JSON.stringify({
        type: MessageType.System,
        roomName: roomName,
        payload: text,
    });
    sendMessageToRoom((await roomService.getRoom(roomName))!, message);
}

export async function sendChatMessageBroadcast(
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
    await addMessage(roomName, from, text);
    sendMessageToRoom((await roomService.getRoom(roomName))!, message);
}

export async function sendUserRoomListBroadcast() {
    for (const ws of wss.clients) {
        const roomInfos: RoomInfo[] = await roomService.getUserRoomInfos(ws);
        const payload: RoomListPayload = {
            type: MessageType.RoomList,
            rooms: roomInfos,
        };
        const json = JSON.stringify(payload);
        if (ws.readyState === ws.OPEN) ws.send(json);
    }
}

function sendMessageToRoom(room: Room, message: string) {
    room.members.forEach((member) => {
        if (member.readyState === member.OPEN) {
            member.send(message);
        }
    });
}
