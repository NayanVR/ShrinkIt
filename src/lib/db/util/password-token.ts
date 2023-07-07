import { eq } from "drizzle-orm";
import { db } from "..";
import { passwordTokens } from "../schema/password-tokens";

interface PasswordToken {
    token: string;
    userID: string;
    tokenExpiry: Date;
}

export async function insertPasswordResetToken(token: string, userID: string) {
    // token expires in 30 minutes
    const tokenExpiry = new Date(Date.now());
    try {
        await db.insert(passwordTokens).values({ token, userID, tokenExpiry });
    } catch (e) {
        console.error(e);
    }
}

export async function getTokenFromPasswordResetToken(token: string): Promise<PasswordToken | undefined> {
    try {
        const result = (await db.select().from(passwordTokens).where(eq(passwordTokens.token, token)).limit(1)).at(0);
        return result;
    } catch (e) {
        console.error(e);
        return undefined;
    }
}