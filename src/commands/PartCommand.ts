import { Command } from "./Command";
import WebSocket from "ws";
import { roomService } from "../services/roomService";
import { normalizeRoomName } from "../utils/normalizeRoomName";
import { sendError, sendSystem } from "../utils/messageSender";

export class PartCommand implements Command {
    readonly name = "part";

    execute(ws: WebSocket, args: string[]): void {
        const room = normalizeRoomName(args[0]);
        if (!room) {
            return sendError(ws, "Usage: /part #room");
        }
        roomService.partRoom(ws, room);
        sendSystem(ws, `Left ${room}`);
    }
}
