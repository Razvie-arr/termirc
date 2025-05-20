import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

export const roomsTable = sqliteTable('rooms', {
    id: text('id').primaryKey(),
});

export const messagesTable = sqliteTable('messages', {
    id: int('id').primaryKey({ autoIncrement: true }),
    roomId: text('room_id')
        .notNull()
        .references(() => roomsTable.id, { onDelete: 'cascade' }),
    nickname: text('nickname').notNull(),
    body: text('body').notNull(),
    timestamp: int('timestamp', { mode: 'timestamp_ms' }).notNull(),
});

export const roomsRelations = relations(roomsTable, ({ many }) => ({
    messages: many(messagesTable),
}));

export const messagesRelations = relations(messagesTable, ({ one }) => ({
    room: one(roomsTable),
}));
