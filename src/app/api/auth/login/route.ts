import { getUser } from "@/lib/db/util/user";
import { getEnvVariable, getErrorResponse } from "@/lib/helpers";
import { signJWT } from "@/lib/token";
import { LoginUserSchema } from "@/lib/validations/user.schema";
import { compare } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const data = LoginUserSchema.parse(body);

        data.username = data.username.toLowerCase();

        const user = await getUser(data.username);

        if (!user || !(await compare(data.password, user.password))) {
            return getErrorResponse(401, "Invalid email or password");
        }

        const JWT_EXPIRES_IN = getEnvVariable("JWT_EXPIRES_IN");

        const token = await signJWT(
            { sub: user.uid },
            { exp: `${JWT_EXPIRES_IN}m` }
        );

        const tokenMaxAge = parseInt(JWT_EXPIRES_IN) * 60;
        const cookieOptions = {
            name: "token",
            value: token,
            httpOnly: true,
            path: "/",
            secure: process.env.NODE_ENV !== "development",
            maxAge: tokenMaxAge,
        };

        const response = new NextResponse(
            JSON.stringify({
                status: "success",
                token,
            }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
            }
        );

        await Promise.all([
            response.cookies.set(cookieOptions),
            response.cookies.set({
                name: "logged-in",
                value: "true",
                maxAge: tokenMaxAge,
            }),
        ]);

        return response;
    } catch (error: any) {
        if (error instanceof ZodError) {
            return getErrorResponse(400, "failed validations", error);
        }

        return getErrorResponse(500, error.message);
    }
}