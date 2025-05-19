import { MessageType } from "../types/MessageType";
import WebSocket from "ws";

export function sendSystem(ws: WebSocket, text: string) {
    ws.send(JSON.stringify({ type: MessageType.System, payload: text }));
}

export function sendInfo(ws: WebSocket, text: string) {
    ws.send(JSON.stringify({ type: MessageType.Info, payload: text }));
}

export function sendError(ws: WebSocket, text: string) {
    ws.send(JSON.stringify({ type: MessageType.Error, payload: text }));
}

export function sendRoomMessage(ws: WebSocket, room: string, from: string, text: string) {
    ws.send(
        JSON.stringify({
            type: MessageType.Message,
            room,
            from,
            payload: text,
        }),
    );
}
