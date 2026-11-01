"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError(null);

    try {
      const { error: result } = await authClient.signIn.email({ email, password });
      if (result) {
        setError(result.message ?? "Connexion impossible.");
        return;
      }
      router.replace("/admin");
      router.refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Le service d'authentification est indisponible.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="site-shell auth-page">
      <div className="auth-card">
        <Link className="brand" href="/" aria-label="Nova Commerce, accueil">
          <span className="brand-mark">N</span>
          <span>nova<span className="brand-accent">.</span></span>
        </Link>
        <p className="eyebrow">Accès administrateur</p>
        <h1>Connexion.</h1>
        <form onSubmit={submit}>
          <label>Email administrateur<input required type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} /></label>
          <label>Mot de passe<input required type="password" minLength={8} autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} /></label>
          <button className="button button-primary" disabled={busy} type="submit">
            {busy ? "Connexion…" : "Ouvrir l'administration"} <span aria-hidden="true">↗</span>
          </button>
          {error && <p role="alert" className="form-message">{error}</p>}
        </form>
        <p className="auth-footnote"><Link href="/admin/verify-email">Recevoir un code de vérification</Link></p>
        <p className="auth-footnote">Le compte administrateur est créé et géré dans Neon Auth.</p>
      </div>
    </main>
  );
}
