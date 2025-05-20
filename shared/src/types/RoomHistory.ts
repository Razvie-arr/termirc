export interface RoomHistoryEntry {
    roomName: string;
    nickname: string;
    body: string;
    timestamp: number;
}

export type RoomHistory = RoomHistoryEntry[];
