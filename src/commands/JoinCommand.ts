import { Command } from "./Command";
import { roomService } from "../services/roomService";
import WebSocket from "ws";
import { normalizeRoomName } from "../utils/normalizeRoomName";
import { sendError, sendSystem } from "../utils/messageSender";

export class JoinCommand implements Command {
    name = "join";
    execute(ws: WebSocket, args: string[]) {
        const room = normalizeRoomName(args[0]);
        if (!room) {
            return sendError(ws, "Usage: /join #room");
        }
        roomService.joinRoom(ws, room);
        sendSystem(ws, `Joined ${room}`);
    }
}
