import WebSocket from 'ws';

export interface Room {
    name: string;
    members: Set<WebSocket>;
}
