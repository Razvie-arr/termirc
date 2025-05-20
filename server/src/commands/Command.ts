import WebSocket from "ws";

export interface Command {
    readonly name: string;
    execute(ws: WebSocket, args: string[]): void;
}
