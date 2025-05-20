import { db } from './db';
import { messagesTable } from './schema';
import { desc, eq } from 'drizzle-orm';
import {
    RoomHistory,
    RoomHistoryEntry,
} from '../../../shared/src/types/RoomHistory';

export async function addMessage(
    roomId: string,
    nickname: string,
    body: string,
) {
    await db
        .insert(messagesTable)
        .values({
            roomId,
            nickname,
            body,
            timestamp: new Date(),
        })
        .run();
}

export async function fetchHistory(roomId: string): Promise<RoomHistory> {
    const rows = await db
        .select({
            nickname: messagesTable.nickname,
            body: messagesTable.body,
            timestamp: messagesTable.timestamp,
        })
        .from(messagesTable)
        .where(eq(messagesTable.roomId, roomId))
        .orderBy(desc(messagesTable.timestamp))
        .all();

    return rows.map<RoomHistoryEntry>((r) => ({
        roomName: roomId,
        nickname: r.nickname,
        body: r.body,
        timestamp:
            r.timestamp instanceof Date
                ? r.timestamp.getTime()
                : (r.timestamp as number),
    }));
}
