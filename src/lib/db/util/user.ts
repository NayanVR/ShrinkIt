import { InferModel, eq } from "drizzle-orm";
import { db } from "..";
import { users } from "../schema/users";

export type User = InferModel<typeof users>;
export type NewUser = InferModel<typeof users, 'insert'>;

export async function insertUser(user: NewUser) {
    try {
        return db.insert(users).values(user);
    } catch (e) {
        console.error(e);
    }
}

export async function getUser(username: string): Promise<User | undefined> {
    try {
        return (await db.select().from(users).where(eq(users.username, username)).limit(1)).at(0);
    } catch (e) {
        console.error(e);
        return undefined
    }
}

export async function getUserByUID(uid: string): Promise<User | undefined> {
    try {
        return (await db.select().from(users).where(eq(users.uid, uid)).limit(1)).at(0);
    } catch (e) {
        console.error(e);
        return undefined
    }
}