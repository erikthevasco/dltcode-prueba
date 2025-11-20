import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const publicPaths = ["/auth/login", "/auth/register", "/api/auth"];
  if (publicPaths.some((p) => pathname.startsWith(p))) return NextResponse.next();

  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  if (!token) return NextResponse.redirect(new URL("/auth/login", request.url));

  if (pathname.startsWith("/dashboard/maestro") && token.rol !== "maestro") {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (pathname.startsWith("/dashboard/cuidador") && token.rol !== "cuidador") {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}
