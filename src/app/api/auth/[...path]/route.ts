import { NextResponse } from "next/server";
import { auth, authConfiguration } from "@/lib/auth/server";

const handlers = auth.handler();

function configurationError() {
  return NextResponse.json(
    { error: "Neon Auth n'est pas configuré. Ajoutez NEON_AUTH_BASE_URL et NEON_AUTH_COOKIE_SECRET dans Vercel." },
    { status: 503 },
  );
}

export const GET = authConfiguration.ready ? handlers.GET : configurationError;
export const POST = authConfiguration.ready ? handlers.POST : configurationError;
export const PUT = authConfiguration.ready ? handlers.PUT : configurationError;
export const DELETE = authConfiguration.ready ? handlers.DELETE : configurationError;
export const PATCH = authConfiguration.ready ? handlers.PATCH : configurationError;
