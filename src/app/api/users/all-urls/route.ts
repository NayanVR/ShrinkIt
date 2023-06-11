import { getAllCustomURLsOfUser } from "@/lib/db/util/custom-url";
import { getAllShrinkURLsOfUser } from "@/lib/db/util/url";
import { getErrorResponse } from "@/lib/helpers";
import { DashboardLinkComponent } from "@/lib/types/dashboard";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(req: NextRequest) {

    const userId = req.headers.get("X-USER-ID");

    try {
        if (!userId) {
            return getErrorResponse(
                401,
                "You are not logged in, please provide token to gain access"
            );
        }

        const hostURL = req.headers.get("host") || "";
        const shrinkUrls = await getAllShrinkURLsOfUser(userId);
        const customUrls = await getAllCustomURLsOfUser(userId);

        let URLs: DashboardLinkComponent[] = [...shrinkUrls!, ...customUrls!];

        URLs.sort((a, b) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        URLs = URLs.map((url) => {
            url.hostName = hostURL;
            return url;
        });

        return new NextResponse(
            JSON.stringify({
                status: "success",
                data: { URLs },
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