import "server-only";
import { auth, authConfiguration } from "@/lib/auth/server";

export async function getAdminContext() {
  if (!authConfiguration.ready) {
    return {
      user: null,
      configured: false,
      isAdmin: false,
      configurationError: authConfiguration.error,
    };
  }

  try {
    const { data } = await auth.getSession();
    const user = data?.user ?? null;
    const email = user?.email?.trim().toLowerCase();
    const allowedEmails = (process.env.ADMIN_EMAILS ?? "")
      .split(",")
      .map((value) => value.trim().toLowerCase())
      .filter(Boolean);

    return {
      user,
      configured: allowedEmails.length > 0,
      isAdmin: Boolean(email && allowedEmails.includes(email)),
      configurationError: null,
    };
  } catch (error) {
    console.error("admin_session_read_failed", { message: error instanceof Error ? error.message : "unknown" });
    return {
      user: null,
      configured: false,
      isAdmin: false,
      configurationError: "La session Neon Auth est indisponible.",
    };
  }
}
