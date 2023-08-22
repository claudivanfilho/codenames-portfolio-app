import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import { NextRequest } from "next/server";
import { DEFAULT_LANG } from "./app/_config/constants";

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

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req, res });

  // Refresh session if expired - required for Server Components
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
  await supabase.auth.getSession();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = req.nextUrl.pathname;

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

  const roomId = user.user_metadata.room_id;

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
