import { CommandMessage } from "../types/UserInput";
import WebSocket from "ws";

export interface Command {
    readonly name: string;
    execute(ws: WebSocket, input: CommandMessage): void;
}
