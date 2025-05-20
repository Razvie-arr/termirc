import WebSocket from 'ws';
import { Room } from '../../../shared/src/types/Room';
import { RoomInfo } from '../../../shared/src/types/RoomInfo';

export class RoomService {
    private rooms = new Map<string, Set<WebSocket>>();
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

    switchRoom(ws: WebSocket, room: string): boolean {
        const members = this.rooms.get(room);
        if (members && members.has(ws)) {
            this.activeRooms.set(ws, room);
            return true;
        }
        return false;
    }

    getAllRooms(): Room[] {
        return [...this.rooms.entries()].map(([name, members]) => ({
            name,
            members,
        }));
    }

    getAllRoomInfos(): RoomInfo[] {
        return this.getAllRooms().map((room) => ({
            name: room.name,
            memberCount: room.members.size,
        }));
    }

    getRoom(roomName: string): Room | undefined {
        const members = this.rooms.get(roomName);
        return members ? { name: roomName, members } : undefined;
    }

    getUserRooms(ws: WebSocket): Room[] {
        return [...this.rooms.entries()]
            .filter(([, members]) => members.has(ws))
            .map(([name, members]) => ({ name, members }));
    }

    getUserRoomInfos(ws: WebSocket): RoomInfo[] {
        return this.getUserRooms(ws).map((r) => ({
            name: r.name,
            memberCount: r.members.size,
        }));
    }

    getUserActiveRoomName(ws: WebSocket): string | undefined {
        return this.activeRooms.get(ws);
    }
}

export const roomService = new RoomService();
