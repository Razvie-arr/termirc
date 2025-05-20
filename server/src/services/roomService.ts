import WebSocket from 'ws';
import { Room } from '../../../shared/src/types/Room';
import { RoomInfo } from '../../../shared/src/types/RoomInfo';
import { createRoom, listRooms } from '../db/rooms';
import { fetchHistory } from '../db/messages';
import { RoomHistory } from '../../../shared/src/types/RoomHistory';
import { sendRoomHistory } from '../messageSenders/directMessageSender';

export class RoomService {
    private rooms = new Map<string, Set<WebSocket>>();
    private activeRooms = new Map<WebSocket, string>();

    async joinRoom(ws: WebSocket, room: string) {
        await createRoom(room);

        if (!this.rooms.has(room)) {
            this.rooms.set(room, new Set());
        }
        this.rooms.get(room)!.add(ws);
        this.activeRooms.set(ws, room);

        const history: RoomHistory = (await fetchHistory(room)).reverse();
        sendRoomHistory(ws, history);
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
        if (!members || !members.has(ws)) return false;

        this.activeRooms.set(ws, room);

        const history: RoomHistory = (await fetchHistory(room)).reverse();
        sendRoomHistory(ws, history);
        return true;
    }

    async getAllRooms(): Promise<Room[]> {
        const dbRooms = await listRooms(); // [{ id: 'general' }, …]

        return dbRooms.map(({ id }) => {
            const mem = this.rooms.get(id);
            return {
                name: id,
                members: mem ?? new Set<WebSocket>(), // empty set when no one online
            };
        });
    }

    async getAllRoomInfos(): Promise<RoomInfo[]> {
        const rooms = await this.getAllRooms();
        return rooms.map((r) => ({
            name: r.name,
            memberCount: r.members.size,
        }));
    }

    async getRoom(roomName: string): Promise<Room | undefined> {
        const exists = (await listRooms()).some((r) => r.id === roomName);
        if (!exists) return undefined;

        const mem = this.rooms.get(roomName) ?? new Set<WebSocket>();
        return { name: roomName, members: mem };
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
