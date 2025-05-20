import { MessageType } from '../../shared/types/MessageType';
import WebSocket from 'ws';

export function sendInfo(ws: WebSocket, text: string) {
    ws.send(JSON.stringify({ type: MessageType.Info, payload: text }));
}

export function sendError(ws: WebSocket, text: string) {
    ws.send(JSON.stringify({ type: MessageType.Error, payload: text }));
}
