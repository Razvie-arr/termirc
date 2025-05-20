import WebSocket from "ws";

type Room = Set<WebSocket>;

export class RoomService {
    private rooms = new Map<string, Room>();
    private activeRooms = new Map<WebSocket, string>();

    joinRoom(ws: WebSocket, room: string) {
        if (!this.rooms.has(room)) {
            this.rooms.set(room, new Set());
        }
        this.rooms.get(room)!.add(ws);
        this.activeRooms.set(ws, room);
    }

    partRoom(ws: WebSocket, room: string) {
        const members = this.rooms.get(room);
        if (!members) return;

        members.delete(ws);

        if (members.size === 0) {
            this.rooms.delete(room);
        }

        if (this.activeRooms.get(ws) === room) {
            this.activeRooms.delete(ws);
        }
    }

    getAllRooms(): { name: string; memberCount: number }[] {
        return [...this.rooms.entries()].map(([name, set]) => ({
            name,
            memberCount: set.size,
        }));
    }

    getActiveRoom(ws: WebSocket): string | undefined {
        return this.activeRooms.get(ws);
    }

    switchRoom(ws: WebSocket, room: string): boolean {
        const members = this.rooms.get(room);
        if (members && members.has(ws)) {
            this.activeRooms.set(ws, room);
            return true;
        }
        return false;
    }

    broadcast(room: string, message: string) {
        this.rooms.get(room)?.forEach((client) => {
            if (client.readyState === client.OPEN) {
                client.send(message);
            }
        });
    }
}

export const roomService = new RoomService();
