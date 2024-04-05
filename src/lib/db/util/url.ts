import { desc, eq, sql } from "drizzle-orm";
import { db } from "..";
import { shrinkUrls } from "../schema/shrink-urls";
import { v4 as uuidv4 } from "uuid";
import { DashboardLinkComponent } from "@/lib/types/dashboard";

export async function getOriginalUrlFromShortUrl(shrinkURL: string): Promise<string | undefined> {
    try {
        const result = await db.select({ url: shrinkUrls.originalUrl }).from(shrinkUrls).where(eq(shrinkUrls.shrinkUrl, shrinkURL)).limit(1);

        if (!result) return undefined;
        return result.at(0)?.url;
    } catch (e) {
        console.error(e);
        return undefined
    }
}

export async function getAllShrinkURLsOfUser(userID: string): Promise<DashboardLinkComponent[] | undefined> {
    try {
        const urls = await db.select().from(shrinkUrls).where(eq(shrinkUrls.userId, userID)).orderBy(desc(shrinkUrls.createdAt));
        return urls.map((url): DashboardLinkComponent => ({
            urlID: url.urlId,
            name: url.name,
            shrinkURL: url.shrinkUrl,
            originalURL: url.originalUrl,
            isCustom: false,
            visits: url.visitCount,
            hostName: "",
            createdAt: new Date(url.createdAt)
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
            urlId: urlID,
            originalUrl: originalURL,
            shrinkUrl: shrinkURL,
            userId: userID,
            name
        });

        return newUrl;
    } catch (e) {
        console.error(e);
        return undefined
    }
}

export async function updateShrinkUrl(link: DashboardLinkComponent): Promise<DashboardLinkComponent | undefined> {
    try {
        await db.update(shrinkUrls)
            .set({
                name: link.name,
                originalUrl: link.originalURL
            })
            .where(eq(shrinkUrls.urlId, link.urlID));

        return link;
    } catch (e) {
        console.error(e)
        return undefined;
    }
}

export async function incrementVisitCountShrinkUrl(shrinkURL: string): Promise<void> {
    try {
        await db.update(shrinkUrls).set({
            visitCount: sql`${shrinkUrls.visitCount} + 1`
        }).where(eq(shrinkUrls.shrinkUrl, shrinkURL));
    } catch (e) {
        console.error(e)
    }
}