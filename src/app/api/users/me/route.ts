import { getUserByUID } from "@/lib/db/util/user";
import { getErrorResponse } from "@/lib/helpers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const userId = req.headers.get("X-USER-ID");

    if (!userId) {
        return getErrorResponse(
            401,
            "You are not logged in, please provide token to gain access"
        );
    }

    const user = await getUserByUID(userId);

    return NextResponse.json({
        status: "success",
        data: { user: { ...user, password: undefined } },
    });
}
