import { varchar, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { shrinkitSchema } from '..';

export const users = shrinkitSchema.table("users", {
    uid: varchar("uid", { length: 256 }).primaryKey().notNull(),
    username: varchar("username", { length: 256 }).notNull(),
    email: varchar("email", { length: 256 }).notNull(),
    password: text("password").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});