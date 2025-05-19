import { Command } from "./Command";
import WebSocket from "ws";
import { MessageType } from "../types/MessageType";
import { roomService } from "../services/roomService";
import { normalizeRoomName } from "../utils/normalizeRoomName";

export class SwitchCommand implements Command {
    readonly name = "switch";

    execute(ws: WebSocket, args: string[]): void {
        const room = normalizeRoomName(args[0]);
        if (!room) {
            return ws.send(
                JSON.stringify({
                    type: MessageType.Error,
                    payload: "Usage: /switch #room",
                }),
            );
        }
        if (!roomService.switchRoom(ws, room)) {
            return ws.send(
                JSON.stringify({
                    type: MessageType.Error,
                    payload: `You’re not in ${room}.`,
                }),
            );
        }
        ws.send(
            JSON.stringify({
                type: MessageType.System,
                payload: `Active room set to ${room}`,
            }),
        );
    }
}
