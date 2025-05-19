import { Command } from "./Command";
import { CommandMessage } from "../types/UserInput";
import { MessageType } from "../types/MessageType";
import { roomService } from "../services/roomService";
import WebSocket from "ws";

export class JoinCommand implements Command {
    name = "join";
    execute(ws: WebSocket, input: CommandMessage) {
        const room = input.args[0];
        if (!room) {
            return ws.send(
                JSON.stringify({
                    type: MessageType.Error,
                    payload: "Usage: /join #room",
                }),
            );
        }
        roomService.joinRoom(ws, room);
        ws.send(
            JSON.stringify({
                type: MessageType.System,
                payload: `Joined ${room}`,
            }),
        );
    }
}
