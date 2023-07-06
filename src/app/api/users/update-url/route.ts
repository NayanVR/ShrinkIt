import { updateCustomUrl } from "@/lib/db/util/custom-url";
import { updateShrinkUrl } from "@/lib/db/util/url";
import { getErrorResponse } from "@/lib/helpers";
import { DashboardLinkComponent } from "@/lib/types/dashboard";
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

        const body = (await req.json()).link as DashboardLinkComponent;

        if (body.name === "") body.name = body.isCustom ? body.shrinkURL.split("/")[1] : body.shrinkURL

        const updatedUrl = body.isCustom ? await updateCustomUrl(body) : await updateShrinkUrl(body);

        if (!updatedUrl) {
            return getErrorResponse(400, "Failed to update url");
        } else {
            return new NextResponse(
                JSON.stringify({
                    status: "success",
                    data: { updatedUrl },
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