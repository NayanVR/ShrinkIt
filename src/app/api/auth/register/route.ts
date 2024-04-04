import { NewUser, insertUser, checkIfUserExists } from "@/lib/db/util/user";
import { getEnvVariable, getErrorResponse } from "@/lib/helpers";
import { signJWT } from "@/lib/token";
import { RegisterUserSchema, RegisterUserSchemaType } from "@/lib/validations/user.schema";
import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const data = RegisterUserSchema.parse(body);

        data.username = data.username.toLowerCase();
        data.email = data.email.toLowerCase();

        const checkUser = await checkIfUserExists(data.username, data.email);

        if (checkUser !== undefined) {
            const errors: any = {};
            errors.username = checkUser.username === data.username ? "Username already exists" : undefined;
            errors.email = checkUser.email === data.email ? "Email already exists" : undefined;

            console.log(checkUser, errors);

            return new NextResponse(
                JSON.stringify({
                    status: "fail",
                    errors,
                }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                }
            )
        } else {
            const hashedPassword = await hash(data.password, parseInt(getEnvVariable("PASSWORD_HASH_SALT")));

            const uid = uuidv4();

            const newUser: NewUser = {
                uid: uid,
                username: data.username,
                email: data.email,
                password: hashedPassword
            }

            await insertUser(newUser);

            const JWT_EXPIRES_IN = getEnvVariable("JWT_EXPIRES_IN");

            const token = await signJWT(
                { sub: uid },
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
        }
    } catch (e: any) {
        if (e instanceof ZodError) {
            return getErrorResponse(400, "failed validations", e);
        }

        return getErrorResponse(500, e.message);
    }
}