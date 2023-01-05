import { NextRequest, NextResponse } from "next/server";
//
export async function middleware(req) {
  const url = req.nextUrl.clone();
  const token = req.cookies.get("token");
  //
  if (url.pathname === "/login" || url.pathname === "/") {
    if (token === undefined || token === null || token === "") {
      if (url.pathname === "/") {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    } else {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }
  if (url.pathname != "/login") {
    if (token === undefined || token === null || token === "") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
}
//
export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico|chickoo_logo).*)"],
  // matcher: "/dashboard/:path*",
};
