import WebSocket from "ws";

export class RoomService {
    joinRoom(ws: WebSocket, roomId: string) {}
    partRoom(ws: WebSocket, roomId: string) {}
}

export const roomService = new RoomService();
