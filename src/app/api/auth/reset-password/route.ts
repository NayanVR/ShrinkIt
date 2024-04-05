import { getTokenFromPasswordResetToken } from "@/lib/db/util/password-token";
import { resetPasswordByUID } from "@/lib/db/util/user";
import { getEnvVariable, getErrorResponse } from "@/lib/helpers";
import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json() as { password: string };
        // get token from req url
        const token = req.nextUrl.searchParams.get("token");

        if (!token) {
            return getErrorResponse(400, "Token not found");
        }

        const tokenData = await getTokenFromPasswordResetToken(token);

        const hashedPassword = await hash(body.password, parseInt(getEnvVariable("PASSWORD_HASH_SALT")));

        if (!tokenData) {
            return getErrorResponse(404, "Invalid token");
        } else {
            const tokenExpiry = new Date(tokenData.tokenExpiry);
            if (tokenExpiry < new Date()) {
                return getErrorResponse(400, "Token expired");
            } else {
                await resetPasswordByUID(tokenData.userId, hashedPassword);

                return new NextResponse(
                    JSON.stringify({
                        message: "Password reset successful",
                    }),
                    {
                        status: 200,
                        headers: { "Content-Type": "application/json" },
                    }
                )
            }
        }
    } catch (error: any) {
        return getErrorResponse(500, error.message);
    }
}