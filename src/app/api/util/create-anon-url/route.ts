import { insertShrinkUrl } from "@/lib/db/util/url";
import { getEnvVariable, getErrorResponse } from "@/lib/helpers";
import { NextRequest, NextResponse } from "next/server";
import shortid from "shortid";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {

    const userId = getEnvVariable("ANON_USER_ID");

    try {
        if (!userId) {
            return getErrorResponse(
                401,
                "Anonymoues user id not found. Please contact admin"
            );
        }

        const body = await req.json() as { url: string };

        const hostURL = req.headers.get("host");

        const shrinkURL = shortid.generate();

        const name = shrinkURL

        const URL = await insertShrinkUrl(body.url, shrinkURL, userId, name);

        if (!URL) {
            return getErrorResponse(400, "Failed to create anon url");
        }
        const generateUrl = `${hostURL}/${URL.shrinkURL}`;

        return new NextResponse(
            JSON.stringify({
                status: "success",
                data: generateUrl,
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