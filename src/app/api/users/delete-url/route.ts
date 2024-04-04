import { db } from "@/lib/db";
import { customUrls } from "@/lib/db/schema/custom-urls";
import { shrinkUrls } from "@/lib/db/schema/shrink-urls";
import { getErrorResponse } from "@/lib/helpers";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
    // get the user id from the request headers
    const userId = req.headers.get("X-USER-ID");
    // get data
    try {
        if (!userId) {
            return getErrorResponse(
                401,
                "You are not logged in, please provide token to gain access"
            );
        }

        const body = await req.json()

        if (body.isCustom) {
            await db.delete(customUrls).where(eq(customUrls.customUrlId, body.urlID));
        } else {
            await db.delete(shrinkUrls).where(eq(shrinkUrls.urlID, body.urlID));
        }

        return new NextResponse(
            JSON.stringify({
                status: "success"
            }),
            {
                status: 201,
                headers: { "Content-Type": "application/json" },
            }
        )
    } catch (e: any) {
        if (e instanceof ZodError) {
            return getErrorResponse(400, "failed validations", e);
        }
        return getErrorResponse(500, e.message);
    }

}