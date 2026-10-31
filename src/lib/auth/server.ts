import { createNeonAuth } from "@neon/auth/next/server";

const baseUrl = process.env.NEON_AUTH_BASE_URL;
if (!baseUrl && process.env.NODE_ENV === "production") throw new Error("NEON_AUTH_BASE_URL is required in production");

export const auth = createNeonAuth({
  baseUrl: baseUrl ?? "http://localhost:3000/api/auth",
  cookies: { secret: process.env.NEON_AUTH_COOKIE_SECRET ?? "nova-local-development-cookie-secret-change-me" },
});
