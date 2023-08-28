import { NextResponse } from "next/server";

import { NextRequest } from "next/server";
import { DEFAULT_LANG } from "./app/_config/constants";
import { getSessionUserForMiddleware } from "./app/_utils/session";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - images
     * - auth (login|logout routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!images|auth|_next/static|_next/image|favicon.ico).*)",
  ],
};

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  res.cookies.set("lang", req.headers.get("accept-language")?.split(",")[0] || DEFAULT_LANG);
  const user = await getSessionUserForMiddleware(req, res);
  const roomId = user?.user_metadata.room_id;
  const pathname = req.nextUrl.pathname;

  console.log(pathname);

  if (pathname.endsWith("/leave")) return res;

  if (pathname.startsWith("/api")) {
    if (!user) {
      return new NextResponse(
        JSON.stringify({ success: false, message: "authentication failed" }),
        { status: 401, headers: { "content-type": "application/json" } }
      );
    } else {
      return res;
    }
  }

  if (pathname.startsWith("/login")) return user ? redirect("/", req) : res;

  if (!user) return redirect(`/login`, req);

  if (pathname.match(/room\/[0-9]*$/)) {
    if (!roomId) return redirect(`/`, req);
  } else {
    if (roomId) return redirect(`/room/${roomId}`, req);
  }

  return res;
}

function redirect(pathname: string, req: NextRequest) {
  return NextResponse.redirect(new URL(pathname, req.url));
}
