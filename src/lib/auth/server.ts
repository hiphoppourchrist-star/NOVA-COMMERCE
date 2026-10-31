import { createNeonAuth } from "@neon/auth/next/server";

const baseUrl = process.env.NEON_AUTH_BASE_URL;
const cookieSecret = process.env.NEON_AUTH_COOKIE_SECRET;
const isNextBuild = process.env.NEXT_PHASE === "phase-production-build";
if (!baseUrl && process.env.NODE_ENV === "production" && !isNextBuild) throw new Error("NEON_AUTH_BASE_URL is required in production");
if (!cookieSecret && process.env.NODE_ENV === "production" && !isNextBuild) throw new Error("NEON_AUTH_COOKIE_SECRET is required in production");

export const auth = createNeonAuth({
  baseUrl: baseUrl ?? "http://localhost:3000/api/auth",
  cookies: { secret: cookieSecret ?? "nova-local-development-cookie-secret-change-me" },
});
