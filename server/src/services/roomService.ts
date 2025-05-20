import WebSocket from 'ws';
import { Room } from '../../../shared/src/types/Room';
import { RoomInfo } from '../../../shared/src/types/RoomInfo';

export class RoomService {
    private rooms = new Map<string, Set<WebSocket>>();
    private activeRooms = new Map<WebSocket, string>();

    async joinRoom(ws: WebSocket, room: string) {
        // await createRoom(room);

        if (!this.rooms.has(room)) {
            this.rooms.set(room, new Set());
        }
        this.rooms.get(room)!.add(ws);
        this.activeRooms.set(ws, room);
    }

    async partRoom(ws: WebSocket, room: string) {
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

    async switchRoom(ws: WebSocket, room: string): Promise<boolean> {
        const members = this.rooms.get(room);
        if (members && members.has(ws)) {
            this.activeRooms.set(ws, room);
            return true;
        }
        return false;
    }

    async getAllRooms(): Promise<Room[]> {
        return [...this.rooms.entries()].map(([name, members]) => ({
            name,
            members,
        }));
    }

    async getAllRoomInfos(): Promise<RoomInfo[]> {
        return (await this.getAllRooms()).map((room) => ({
            name: room.name,
            memberCount: room.members.size,
        }));
    }

    async getRoom(roomName: string): Promise<Room | undefined> {
        const members = this.rooms.get(roomName);
        return members ? { name: roomName, members } : undefined;
    }

    async getUserRooms(ws: WebSocket): Promise<Room[]> {
        return [...this.rooms.entries()]
            .filter(([, members]) => members.has(ws))
            .map(([name, members]) => ({ name, members }));
    }

    async getUserRoomInfos(ws: WebSocket): Promise<RoomInfo[]> {
        return (await this.getUserRooms(ws)).map((r) => ({
            name: r.name,
            memberCount: r.members.size,
        }));
    }

    async getUserActiveRoomName(ws: WebSocket): Promise<string | undefined> {
        return this.activeRooms.get(ws);
    }
}

export const roomService = new RoomService();
