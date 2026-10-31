"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth/client";

export function AdminSignOutButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function signOut() {
    setBusy(true);
    await authClient.signOut();
    router.replace("/admin/login");
    router.refresh();
  }

  return <button className="button button-secondary" type="button" onClick={() => void signOut()} disabled={busy}>{busy ? "Déconnexion…" : "Se déconnecter"}</button>;
}
