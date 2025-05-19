import { Command } from "./Command";
import WebSocket from "ws";
import { CommandMessage } from "../types/UserInput";
import { MessageType } from "../types/MessageType";
import { roomService } from "../services/roomService";

export class PartCommand implements Command {
    readonly name = "part";

    execute(ws: WebSocket, input: CommandMessage): void {
        const room = input.args[0];
        if (!room) {
            return ws.send(
                JSON.stringify({
                    type: MessageType.Error,
                    payload: "Usage: /part #room",
                }),
            );
        }
        roomService.partRoom(ws, room);
        ws.send(
            JSON.stringify({
                type: MessageType.System,
                payload: `Left ${room}`,
            }),
        );
    }
}
