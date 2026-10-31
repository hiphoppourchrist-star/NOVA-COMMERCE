import { randomBytes } from "node:crypto";
import { createNeonAuth } from "@neon/auth/next/server";

const baseUrl = process.env.NEON_AUTH_BASE_URL;
const cookieSecret = process.env.NEON_AUTH_COOKIE_SECRET;
const isNextBuild = process.env.NEXT_PHASE === "phase-production-build";

export const authConfiguration = {
  ready: Boolean(baseUrl && cookieSecret),
  error: !baseUrl ? "NEON_AUTH_BASE_URL est manquante." : !cookieSecret ? "NEON_AUTH_COOKIE_SECRET est manquante." : null,
};

if (!authConfiguration.ready && process.env.NODE_ENV === "production" && !isNextBuild) {
  console.error("neon_auth_configuration_incomplete", { error: authConfiguration.error });
}

export const auth = createNeonAuth({
  baseUrl: baseUrl ?? "http://localhost:3000/api/auth",
  cookies: {
    secret: cookieSecret ?? randomBytes(32).toString("hex"),
  },
});
