import { Command } from "./Command";
import WebSocket from "ws";
import { roomService } from "../services/roomService";
import { MessageType } from "../types/MessageType";

export class ListCommand implements Command {
    readonly name = "list";

    execute(ws: WebSocket, _args: string[]): void {
        const rooms = roomService.getAllRooms();
        if (rooms.length === 0) {
            return ws.send(
                JSON.stringify({
                    type: MessageType.System,
                    payload: "No rooms available.",
                }),
            );
        }

        for (const { name, memberCount } of rooms) {
            ws.send(
                JSON.stringify({
                    type: MessageType.System,
                    payload: `${name} — ${memberCount} user${memberCount !== 1 ? "s" : ""}`,
                }),
            );
        }

        ws.send(
            JSON.stringify({
                type: MessageType.System,
                payload: "End of /list.",
            }),
        );
    }
}
