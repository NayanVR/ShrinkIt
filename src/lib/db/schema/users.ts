import { mysqlTable, text, timestamp, varchar } from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
    uid: varchar('uid', { length: 256 }).primaryKey(),
    username: varchar('username', { length: 256 }).notNull(),
    email: varchar('email', { length: 256 }).notNull(),
    password: text('password').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow()
});