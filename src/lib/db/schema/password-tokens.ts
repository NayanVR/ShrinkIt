import { mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';

export const passwordTokens = mysqlTable('password_tokens', {
    token: varchar('token', { length: 256 }).primaryKey(),
    userID: varchar('user_id', { length: 256 }).notNull(),
    tokenExpiry: timestamp('token_expiry').notNull()
});