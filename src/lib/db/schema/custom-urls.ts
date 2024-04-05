import { pgTable, integer, varchar, text, timestamp } from 'drizzle-orm/pg-core';
import { shrinkitSchema } from '..';

export const customUrls = shrinkitSchema.table("custom_urls", {
    customUrlId: varchar("custom_url_id", { length: 256 }).primaryKey().notNull(),
    username: varchar("username", { length: 256 }).notNull(),
    customUrl: varchar("custom_url", { length: 256 }).notNull(),
    originalUrl: text("original_url").notNull(),
    userId: varchar("user_id", { length: 256 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
    name: varchar("name", { length: 256 }).default('Nameless').notNull(),
    visitCount: integer("visit_count").default(0).notNull(),
});