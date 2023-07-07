import { getErrorResponse } from "@/lib/helpers";
import { NextRequest, NextResponse } from "next/server";
import crypto from 'crypto';
import { getUser, getUserByEmail } from "@/lib/db/util/user";
import { sendResetPasswordEmail } from "@/lib/email";
import { insertPasswordResetToken } from "@/lib/db/util/password-token";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json() as { userIdentifier: string };

        let token = crypto.randomBytes(48).toString('hex');

        const userIdentifier = body.userIdentifier.trim();

        const user = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(userIdentifier) ? await getUserByEmail(userIdentifier) : await getUser(userIdentifier);

        if (!user) {
            return getErrorResponse(404, "User not found");
        } else {
            const hostURL = req.headers.get("host");

            const url = `${hostURL}/password-reset?token=${token}`;
            await insertPasswordResetToken(token, user.uid);
            await sendResetPasswordEmail(user.email, url);

            return new NextResponse(
                JSON.stringify({
                    message: "Password reset link has been sent to your email address",
                }),
                {
                    status: 200,
                    headers: { "Content-Type": "application/json" },
                }
            )
        }

    } catch (error: any) {
        return getErrorResponse(500, error.message);
    }
}