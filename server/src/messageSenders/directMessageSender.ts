import { MessageType } from '../../../shared/src/types/MessageType';
import WebSocket from 'ws';
import { RoomInfo } from '../../../shared/src/types/RoomInfo';
import { RoomListPayload } from '../../../shared/src/types/RoomListPayload';
import { ActiveRoomPayload } from '../../../shared/src/types/ActiveRoomPayload';
import { RoomHistoryPayload } from '../../../shared/src/types/RoomHistoryPayload';
import { RoomHistory } from '../../../shared/src/types/RoomHistory';

export function sendInfo(ws: WebSocket, text: string) {
    ws.send(JSON.stringify({ type: MessageType.Info, payload: text }));
}

export function sendError(ws: WebSocket, text: string) {
    ws.send(JSON.stringify({ type: MessageType.Error, payload: text }));
}

export function sendActiveRoom(ws: WebSocket, roomName: string) {
    const payload: ActiveRoomPayload = {
        type: MessageType.ActiveRoom,
        roomName: roomName,
    };
    const json = JSON.stringify(payload);
    ws.send(json);
}

export function sendUserRoomList(ws: WebSocket, roomInfos: RoomInfo[]) {
    const payload: RoomListPayload = {
        type: MessageType.RoomList,
        rooms: roomInfos,
    };
    const json = JSON.stringify(payload);
    ws.send(json);
}

export function sendRoomHistory(ws: WebSocket, history: RoomHistory) {
    const payload: RoomHistoryPayload = {
        type: MessageType.RoomHistory,
        history: history,
    };
    const json = JSON.stringify(payload);
    ws.send(json);
}
