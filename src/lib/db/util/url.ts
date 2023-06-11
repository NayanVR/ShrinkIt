import { desc, eq, sql } from "drizzle-orm";
import { db } from "..";
import { shrinkUrls } from "../schema/shrink-urls";
import { v4 as uuidv4 } from "uuid";
import { DashboardLinkComponent } from "@/lib/types/dashboard";

export async function getOriginalUrlFromShortUrl(shrinkURL: string): Promise<string | undefined> {
    try {
        const result = await db.select({ url: shrinkUrls.originalURL }).from(shrinkUrls).where(eq(shrinkUrls.shrinkURL, shrinkURL)).limit(1);

        if (!result) return undefined;
        return result.at(0)?.url;
    } catch (e) {
        console.error(e);
        return undefined
    }
}

export async function getAllShrinkURLsOfUser(userID: string): Promise<DashboardLinkComponent[] | undefined> {
    try {
        const urls = await db.select().from(shrinkUrls).where(eq(shrinkUrls.userID, userID)).orderBy(desc(shrinkUrls.createdAt));
        return urls.map((url): DashboardLinkComponent => ({
            urlID: url.urlID,
            name: url.name,
            shrinkURL: url.shrinkURL,
            originalURL: url.originalURL,
            isCustom: false,
            visits: url.visitCount,
            hostName: "",
            createdAt: url.createdAt
        }));
    } catch (e) {
        console.error(e);
        return undefined
    }
}

export async function insertShrinkUrl(originalURL: string, shrinkURL: string, userID: string, name: string): Promise<DashboardLinkComponent | undefined> {
    const urlID = uuidv4();

    try {
        const newUrl: DashboardLinkComponent = {
            urlID: urlID,
            name: name,
            shrinkURL: shrinkURL,
            originalURL: originalURL,
            isCustom: false,
            visits: 0,
            hostName: "",
            createdAt: new Date()
        }

        await db.insert(shrinkUrls).values({
            urlID,
            originalURL,
            shrinkURL,
            userID,
            name
        })

        return newUrl;
    } catch (e) {
        console.error(e);
        return undefined
    }
}

export async function incrementVisitCountShrinkUrl(shrinkURL: string): Promise<void> {
    try {
        await db.update(shrinkUrls).set({
            visitCount: sql`${shrinkUrls.visitCount} + 1`
        }).where(eq(shrinkUrls.shrinkURL, shrinkURL));
    } catch (e) {
        console.error(e)
    }
}