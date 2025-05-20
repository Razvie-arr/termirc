import { db } from './db';
import { messagesTable } from './schema';
import { desc, eq } from 'drizzle-orm';

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

export async function fetchHistory(roomId: string) {
    return db
        .select({
            nickname: messagesTable.nickname,
            body: messagesTable.body,
        })
        .from(messagesTable)
        .where(eq(messagesTable.roomId, roomId))
        .orderBy(desc(messagesTable.timestamp))
        .all();
}
