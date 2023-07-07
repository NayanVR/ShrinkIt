import { InferModel, eq, or } from "drizzle-orm";
import { db } from "..";
import { users } from "../schema/users";
import { passwordTokens } from "../schema/password-tokens";

export type User = InferModel<typeof users>;
export type NewUser = InferModel<typeof users, 'insert'>;

export async function insertUser(user: NewUser) {
    try {
        return db.insert(users).values(user);
    } catch (e) {
        console.error(e);
        return undefined;
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

export async function getUserByEmail(email: string): Promise<User | undefined> {
    try {
        return (await db.select().from(users).where(eq(users.email, email)).limit(1)).at(0);
    } catch (e) {
        console.error(e);
        return undefined
    }
}

export async function resetPasswordByUID(userID: string, password: string) {
    try {
        await db.transaction(async (tx) => {
            await tx.update(users).set({ password }).where(eq(users.uid, userID));
            await tx.delete(passwordTokens).where(eq(passwordTokens.userID, userID));
        });
    } catch (e) {
        console.error(e);
    }
}

export async function checkIfUserExists(username: string, email: string): Promise<User | undefined> {
    try {
        return (await db.select().from(users).where(or(eq(users.username, username), eq(users.email, email))).limit(1)).at(0);
    } catch (e) {
        console.error(e);
        return undefined;
    }
}