import { eq } from "drizzle-orm";
import { db } from "..";
import { shrinkUrls } from "../schema/shrink-urls";
import { v4 as uuidv4 } from "uuid";

export async function getOriginalUrlFromShortUrl(shrinkURL: string): Promise<string | undefined> {
    try {
        return (await db.select().from(shrinkUrls).where(eq(shrinkUrls.shrinkURL, shrinkURL)).limit(1)).at(0)?.originalURL;
    } catch (e) {
        console.error(e);
        return undefined
    }
}

export async function getAllShrinkURLsOfUser(hostURL: string, userID: string): Promise<string[] | undefined> {
    try {
        return (await db.select().from(shrinkUrls).where(eq(shrinkUrls.userID, userID)))
            .map((url) => hostURL + "/" + url.shrinkURL);
    } catch (e) {
        console.error(e);
        return undefined
    }
}

export async function insertShrinkUrl(originalURL: string, shrinkURL: string, userID: string): Promise<void> {
    const urlID = uuidv4();

    try {
        await db.insert(shrinkUrls).values({
            urlID,
            originalURL,
            shrinkURL,
            userID
        })
    } catch (e) {
        console.error(e);
        return undefined
    }
}