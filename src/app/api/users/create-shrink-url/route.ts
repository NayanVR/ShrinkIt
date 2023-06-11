import { insertShrinkUrl } from "@/lib/db/util/url";
import { getErrorResponse } from "@/lib/helpers";
import { CreateShrinkUrlSchema } from "@/lib/validations/url.schema";
import { NextRequest, NextResponse } from "next/server";
import shortid from "shortid";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {

    const userId = req.headers.get("X-USER-ID");

    try {
        if (!userId) {
            return getErrorResponse(
                401,
                "You are not logged in, please provide token to gain access"
            );
        }

        const body = await req.json()
        const data = CreateShrinkUrlSchema.parse(body);

        const hostURL = req.headers.get("host");

        const shrinkURL = shortid.generate();

        if (data.name === "") data.name = shrinkURL

        const URL = await insertShrinkUrl(data.url, shrinkURL, userId, data.name!);

        if (!URL) {
            return getErrorResponse(400, "Failed to create shrink url");
        }
        URL.hostName = hostURL!;

        return new NextResponse(
            JSON.stringify({
                status: "success",
                data: { URL },
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