import { int, mysqlTable, text, timestamp, varchar } from 'drizzle-orm/mysql-core';

export const customUrls = mysqlTable('custom_urls', {
    customUrlId: varchar('custom_url_id', { length: 256 }).primaryKey(),
    name: varchar('name', { length: 256 }).notNull().default('Nameless'),
    username: varchar('username', { length: 256 }).notNull(),
    customURL: varchar('custom_url', { length: 256 }).notNull(),
    originalURL: text('original_url').notNull(),
    visitCount: int('visit_count').notNull().default(0),
    userID: varchar('user_id', { length: 256 }).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow()
});