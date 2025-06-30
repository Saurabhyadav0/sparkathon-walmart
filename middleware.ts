import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    /*
     * Protect all routes under /dashboard (or whatever you want)
     */
    "/dashboard(.*)",
  ],
};
