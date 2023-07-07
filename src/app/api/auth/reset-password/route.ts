import { getEnvVariable, getErrorResponse } from "@/lib/helpers";
import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json() as { password: string };
        // get token from req url
        const token = req.nextUrl.searchParams.get("token");

        const hashedPassword = await hash(body.password, parseInt(getEnvVariable("PASSWORD_HASH_SALT")));

        console.log(token, body.password);

        return new NextResponse(
            JSON.stringify({
                message: "Password reset successful",
            }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
            }
        )
    } catch (error: any) {
        return getErrorResponse(500, error.message);
    }
}