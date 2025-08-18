import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(['/sign-in', '/sign-up','/']);

export default clerkMiddleware(async (auth, req) => {
  const url = req.nextUrl.pathname;

  if (
    url.startsWith("/_next/") ||
    url.startsWith("/static/") ||
    url.match(/\.(js|css|ico|png|jpg|svg|xml|txt)$/)
  ) {
    return;
  }

  if (isPublicRoute(req)) return;

  // Absolute URL for unauthenticated redirect
  const baseUrl = req.nextUrl.origin;
  await auth.protect({ unauthenticatedUrl: `${baseUrl}/sign-up` });
});

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)",
    "/",
    "/(api|trpc)(.*)",
  ],
};
