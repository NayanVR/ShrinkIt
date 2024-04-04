import { insertCustomUrl } from "@/lib/db/util/custom-url";
import { getUserByUID } from "@/lib/db/util/user";
import { getErrorResponse } from "@/lib/helpers";
import { CreateCustomUrlSchema } from "@/lib/validations/url.schema";
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
        const data = CreateCustomUrlSchema.parse(body);

        data.customUrl = data.customUrl.toLowerCase().replaceAll(" ", "-");

        const hostURL = req.headers.get("host");

        const username = await (await getUserByUID(userId))?.username;

        if (!username) {
            return getErrorResponse(400, "User not found");
        } else {

            if (data.name === "") data.name = data.customUrl

            const URL = await insertCustomUrl(data.url, data.customUrl, username, userId, data.name!);

            if (!URL) {
                return getErrorResponse(400, "Failed to create custom url");
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
        }

    } catch (e: any) {
        if (e instanceof ZodError) {
            return getErrorResponse(400, "failed validations", e);
        }
        return getErrorResponse(500, e.message);
    }
}