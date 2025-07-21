import { NextResponse, NextRequest } from "next/server";

import { auth } from "./auth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Public routes
  const publicPaths = ["/", "/signin", "/contact", "/about", "/services"];

  // Allow requests to public pages without authentication
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // Check for a valid session on protected routes
  const session = await auth();

  if (!session) {
    const signInUrl = new URL("/signin", req.url);
    signInUrl.searchParams.set("callbackUrl", req.url);
    signInUrl.searchParams.set(
      "error",
      "You must be logged in to view that page."
    );
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|signin|about|contact|services).*)",
  ],
};

// "employee_email": "update@gmail.com",
//  "employee_password": "8HYsy&^uud*7hh"
