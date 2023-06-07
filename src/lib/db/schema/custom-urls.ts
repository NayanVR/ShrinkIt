import { mysqlTable, text, timestamp, varchar } from 'drizzle-orm/mysql-core';

export const customUrls = mysqlTable('custom_urls', {
    customUrlId: varchar('custom_url_id', { length: 256 }).primaryKey(),
    username: varchar('username', { length: 256 }).notNull(),
    customURL: varchar('shrink_url', { length: 256 }).notNull(),
    originalURL: text('original_url').notNull(),
    userID: varchar('user_id', { length: 256 }).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow()
});