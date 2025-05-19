import { Command } from "./Command";
import WebSocket from "ws";
import { MessageType } from "../types/MessageType";
import { roomService } from "../services/roomService";
import { normalizeRoomName } from "../utils/normalizeRoomName";

export class PartCommand implements Command {
    readonly name = "part";

    execute(ws: WebSocket, args: string[]): void {
        const room = normalizeRoomName(args[0]);
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
