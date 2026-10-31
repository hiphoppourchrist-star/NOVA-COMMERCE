import "server-only";
import { auth } from "@/lib/auth/server";

function configuredAdminEmails() {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export async function getAdminContext() {
  const { data } = await auth.getSession();
  const user = data?.user ?? null;
  const email = user?.email?.trim().toLowerCase();
  const allowedEmails = configuredAdminEmails();

  return {
    user,
    configured: allowedEmails.length > 0,
    isAdmin: Boolean(email && allowedEmails.includes(email)),
  };
}
