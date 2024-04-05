import { pgTable, varchar, timestamp } from 'drizzle-orm/pg-core';
import { shrinkitSchema } from '..';

export const passwordTokens = shrinkitSchema.table("password_tokens", {
    token: varchar("token", { length: 256 }).primaryKey().notNull(),
    userId: varchar("user_id", { length: 256 }).notNull(),
    tokenExpiry: timestamp("token_expiry", { withTimezone: true, mode: 'string' }).notNull(),
});