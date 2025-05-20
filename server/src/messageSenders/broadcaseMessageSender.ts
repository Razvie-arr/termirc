import { MessageType } from '../../../shared/src/types/MessageType';
import { roomService } from '../services/roomService';

export function sendSystemBroadcast(room: string, text: string) {
    const message = JSON.stringify({
        type: MessageType.System,
        room,
        payload: text,
    });
    roomService.broadcast(room, message);
}

export function sendChatMessageBroadcast(
    room: string,
    from: string,
    text: string,
) {
    const message = JSON.stringify({
        type: MessageType.Message,
        room,
        from,
        payload: text,
    });
    roomService.broadcast(room, message);
}
