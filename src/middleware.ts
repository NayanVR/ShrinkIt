import { NextRequest, NextResponse } from "next/server";
import { getErrorResponse } from "./lib/helpers";
import { verifyJWT } from "./lib/token";
import { getOriginalUrlFromShortUrl } from "./lib/db/util/url";

interface AuthenticatedRequest extends NextRequest {
    user: {
        id: string
    }
}

let redirectToLogin = false;

export async function middleware(req: NextRequest) {

    const pathName = req.nextUrl.pathname;

    // ignore paths who doen't need authentication
    if (pathName.startsWith("/register")) {
        return;
    }

    if (pathName.startsWith("/dashboard")
        || pathName.startsWith("/api/users")
        || pathName.startsWith("/api/auth/logout")
        || pathName.startsWith("/login")) {

        let token: string | undefined

        if (req.cookies.has("token")) {
            token = req.cookies.get("token")?.value
        } else if (req.headers.get("Authorization")?.startsWith("Bearer ")) {
            token = req.headers.get("Authorization")?.substring(7);
        }

        if (req.nextUrl.pathname.startsWith("/login") && (!token || redirectToLogin)) return;

        if (
            !token &&
            (req.nextUrl.pathname.startsWith("/api/users") ||
                req.nextUrl.pathname.startsWith("/api/auth/logout"))
        ) {
            return getErrorResponse(
                401,
                "You are not logged in. Please provide a token to gain access."
            );
        }

        const resposne = NextResponse.next();

        try {
            if (token) {
                const { sub } = await verifyJWT<{ sub: string }>(token);
                resposne.headers.set("X-USER-ID", sub);
                (req as AuthenticatedRequest).user = { id: sub }
            }
        } catch (e) {
            redirectToLogin = true;
            if (req.nextUrl.pathname.startsWith("/api")) {
                return getErrorResponse(401, "Token is invalid or user doesn't exists");
            }

            return NextResponse.redirect(
                new URL(
                    `/login?${new URLSearchParams({
                        error: "badauth"
                    })}`,
                    req.url
                )
            );
        }

        const authUser = (req as AuthenticatedRequest).user;

        if (!authUser) {
            return NextResponse.redirect(
                new URL(
                    `/login?${new URLSearchParams({
                        error: "badauth",
                        forceLogin: "true",
                    })}`,
                    req.url
                )
            );
        }

        if (req.url.includes("/login") && authUser) {
            return NextResponse.redirect(new URL("/dashboard", req.url));
        }

        return resposne;
    }

    // URL follow this pattern
    // /abc or /username/abc
    const shortUrlRegex = /^\/[^/]+$/
    const customUrlRegex = /^\/[^/]+\/[^/]+$/;

    if (shortUrlRegex.test(req.nextUrl.pathname)) {
        const shrinkURL = req.nextUrl.pathname.substring(1);
        const originalURL = await getOriginalUrlFromShortUrl(shrinkURL);

        if (!originalURL) {
            return getErrorResponse(404, "URL not found");
        } else {
            return new NextResponse("", {
                status: 302,
                headers: {
                    "Location": originalURL
                }
            });
        }
    }

}

export const config = {
    matcher: ["/:firstslug/", "/:firstslug/:secondslug/", "/login", "/api/users/:path*", "/api/auth/logout"]
}