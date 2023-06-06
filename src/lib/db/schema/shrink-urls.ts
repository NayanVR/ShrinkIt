import { mysqlTable, text, timestamp, varchar } from 'drizzle-orm/mysql-core';

export const shrinkUrls = mysqlTable('shrink_urls', {
    urlID: varchar('url_id', { length: 256 }).primaryKey(),
    shrinkURL: varchar('shrink_url', { length: 256 }).notNull(),
    originalURL: text('original_url').notNull(),
    userID: varchar('user_id', { length: 256 }).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow()
});