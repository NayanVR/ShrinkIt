import { v4 as uuidv4 } from "uuid";
import { customUrls } from "../schema/custom-urls";
import { db } from "..";
import { and, eq } from "drizzle-orm";

export async function insertCustomUrl(originalURL: string, customURL: string, username: string, userID: string): Promise<void> {
    const customUrlId = uuidv4();
    console.log(userID, username);

    try {
        await db.insert(customUrls).values({
            customUrlId,
            username,
            customURL,
            originalURL,
            userID
        })
    } catch (e) {
        console.error(e);
        return undefined
    }
}

export async function getOriginalUrlFromCustomUrl(username: string, customURL: string): Promise<string | undefined> {
    try {
        return (await db.select().from(customUrls).where(
            and(
                eq(customUrls.username, username),
                eq(customUrls.customURL, customURL)
            )
        ).limit(1)).at(0)?.originalURL;
    } catch (e) {
        console.error(e);
        return undefined
    }
}

export async function getAllCustomURLsOfUser(userID: string): Promise<string[] | undefined> {
    try {
        return (await db.select().from(customUrls).where(eq(customUrls.userID, userID)))
            .map((url) => url.username + "/" + url.customURL);
    } catch (e) {
        console.error(e);
        return undefined
    }
}
