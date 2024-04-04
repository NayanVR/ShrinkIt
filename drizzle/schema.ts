import { mysqlTable, mysqlSchema, AnyMySqlColumn, varchar, text, timestamp, int } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"


export const customUrls = mysqlTable("custom_urls", {
	customUrlId: varchar("custom_url_id", { length: 256 }).primaryKey().notNull(),
	username: varchar("username", { length: 256 }).notNull(),
	customUrl: varchar("custom_url", { length: 256 }).notNull(),
	originalUrl: text("original_url").notNull(),
	userId: varchar("user_id", { length: 256 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	name: varchar("name", { length: 256 }).default('Nameless').notNull(),
	visitCount: int("visit_count").default(0).notNull(),
});

export const passwordTokens = mysqlTable("password_tokens", {
	token: varchar("token", { length: 256 }).primaryKey().notNull(),
	userId: varchar("user_id", { length: 256 }).notNull(),
	tokenExpiry: timestamp("token_expiry", { mode: 'string' }).notNull(),
});

export const shrinkUrls = mysqlTable("shrink_urls", {
	urlId: varchar("url_id", { length: 256 }).primaryKey().notNull(),
	shrinkUrl: varchar("shrink_url", { length: 256 }).notNull(),
	originalUrl: text("original_url").notNull(),
	userId: varchar("user_id", { length: 256 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	name: varchar("name", { length: 256 }).default('Nameless').notNull(),
	visitCount: int("visit_count").default(0).notNull(),
});

export const users = mysqlTable("users", {
	uid: varchar("uid", { length: 256 }).primaryKey().notNull(),
	username: varchar("username", { length: 256 }).notNull(),
	email: varchar("email", { length: 256 }).notNull(),
	password: text("password").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
});