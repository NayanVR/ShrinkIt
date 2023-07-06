import { NextRequest, NextResponse } from "next/server";
import { getErrorResponse } from "./lib/helpers";
import { verifyJWT } from "./lib/token";
import { getOriginalUrlFromShortUrl, incrementVisitCountShrinkUrl } from "./lib/db/util/url";
import { getOriginalUrlFromCustomUrl, incrementVisitCountCustomUrl } from "./lib/db/util/custom-url";

interface AuthenticatedRequest extends NextRequest {
    user: {
        id: string
    }
}

let redirectToLogin = false;

export async function middleware(req: NextRequest) {

    const pathName = req.nextUrl.pathname;

    // ignore paths who doesn't need middleware
    if (pathName.startsWith("/register")
        || pathName.includes(".svg")
        || pathName.includes(".png")
        || pathName.includes(".ico")
        || pathName.includes(".mp4")
        || pathName.includes("_next")
        || pathName.includes(".ttf")) {
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
            return NextResponse.next();
        } else {
            await incrementVisitCountShrinkUrl(shrinkURL);
            return new NextResponse("", {
                status: 302,
                headers: {
                    "Location": originalURL
                }
            });
        }
    }

    if (customUrlRegex.test(req.nextUrl.pathname)) {
        const username = req.nextUrl.pathname.substring(1).split("/")[0];
        const customURL = req.nextUrl.pathname.substring(1).split("/")[1];
        const originalURL = await getOriginalUrlFromCustomUrl(username, customURL);

        if (!originalURL) {
            return NextResponse.next();
        } else {
            await incrementVisitCountCustomUrl(username, customURL);
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