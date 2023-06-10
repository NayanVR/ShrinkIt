import { insertCustomUrl } from "@/lib/db/util/custom-url";
import { getUserByUID } from "@/lib/db/util/user";
import { getErrorResponse } from "@/lib/helpers";
import { createCustomUrlSchema } from "@/lib/validations/url.schema";
import { NextRequest, NextResponse } from "next/server";
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
        const data = createCustomUrlSchema.parse(body);

        const hostURL = req.headers.get("host");

        const username = await (await getUserByUID(userId))?.username;

        if (!username) {
            return getErrorResponse(400, "User not found");
        } else {
            await insertCustomUrl(data.url, data.customUrl, username, userId);
        }

        return new NextResponse(
            JSON.stringify({
                status: "success",
                data: { URL: hostURL + "/" + username + "/" + data.customUrl },
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