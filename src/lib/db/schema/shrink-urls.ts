import { pgTable, integer, varchar, text, timestamp } from 'drizzle-orm/pg-core';
import { users } from './users';
import { shrinkitSchema } from '..';

export const shrinkUrls = shrinkitSchema.table("shrink_urls", {
    urlId: varchar("url_id", { length: 256 }).primaryKey().notNull(),
    shrinkUrl: varchar("shrink_url", { length: 256 }).notNull(),
    originalUrl: text("original_url").notNull(),
    userId: varchar("user_id", { length: 256 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
    name: varchar("name", { length: 256 }).default('Nameless').notNull(),
    visitCount: integer("visit_count").default(0).notNull(),
});