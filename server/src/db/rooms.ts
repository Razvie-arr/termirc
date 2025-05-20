import { db } from './db';
import { roomsTable } from './schema';

export async function createRoom(id: string) {
    await db.insert(roomsTable).values({ id }).onConflictDoNothing().run();
}

export async function listRooms() {
    return db.select({ id: roomsTable.id }).from(roomsTable).all();
}
