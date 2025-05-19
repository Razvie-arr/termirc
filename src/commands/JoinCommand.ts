import { Command } from "./Command";
import { MessageType } from "../types/MessageType";
import { roomService } from "../services/roomService";
import WebSocket from "ws";
import { normalizeRoomName } from "../utils/normalizeRoomName";

export class JoinCommand implements Command {
    name = "join";
    execute(ws: WebSocket, args: string[]) {
        const room = normalizeRoomName(args[0]);
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
