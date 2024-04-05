import { v4 as uuidv4 } from "uuid";
import { customUrls } from "../schema/custom-urls";
import { db } from "..";
import { and, desc, eq, sql } from "drizzle-orm";
import { DashboardLinkComponent } from "@/lib/types/dashboard";

export async function insertCustomUrl(originalURL: string, customURL: string, username: string, userID: string, name: string): Promise<DashboardLinkComponent | undefined> {
    const customUrlId = uuidv4();

    try {
        const newUrl: DashboardLinkComponent = {
            urlID: customUrlId,
            name: name,
            shrinkURL: username + "/" + customURL,
            originalURL: originalURL,
            isCustom: true,
            visits: 0,
            hostName: "",
            createdAt: new Date()
        }

        await db.insert(customUrls).values({
            customUrlId,
            username,
            customUrl: customURL,
            originalUrl: originalURL,
            userId: userID,
            name
        });

        return newUrl;
    } catch (e) {
        console.error(e);
        return undefined
    }
}

export async function getOriginalUrlFromCustomUrl(username: string, customURL: string): Promise<string | undefined> {
    try {
        const result = await db.select({ url: customUrls.originalUrl }).from(customUrls).where(
            and(
                eq(customUrls.username, username),
                eq(customUrls.customUrl, customURL)
            )
        ).limit(1);

        if (!result) return undefined;
        return result.at(0)?.url;
    } catch (e) {
        console.error(e);
        return undefined
    }
}

export async function getAllCustomURLsOfUser(userID: string): Promise<DashboardLinkComponent[] | undefined> {
    try {
        const urls = await db.select().from(customUrls).where(eq(customUrls.userId, userID)).orderBy(desc(customUrls.createdAt));
        return urls.map((url): DashboardLinkComponent => ({
            urlID: url.customUrlId,
            name: url.name,
            shrinkURL: url.username + "/" + url.customUrl,
            originalURL: url.originalUrl,
            isCustom: true,
            visits: url.visitCount,
            hostName: "",
            createdAt: new Date(url.createdAt)
        }));
    } catch (e) {
        console.error(e);
        return undefined
    }
}

export async function updateCustomUrl(link: DashboardLinkComponent): Promise<DashboardLinkComponent | undefined> {
    try {
        await db.update(customUrls)
            .set({
                name: link.name,
                originalUrl: link.originalURL,
                customUrl: link.shrinkURL.split("/")[1]
            })
            .where(eq(customUrls.customUrlId, link.urlID));

        return link;
    } catch (e) {
        console.error(e)
        return undefined;
    }
}

export async function incrementVisitCountCustomUrl(username: string, customURL: string): Promise<void> {
    try {
        await db.update(customUrls).set({
            visitCount: sql`${customUrls.visitCount} + 1`
        }).where(
            and(
                eq(customUrls.username, username),
                eq(customUrls.customUrl, customURL)
            )
        )
    } catch (e) {
        console.error(e);
    }
}