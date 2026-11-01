"use client";

import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/auth/client";

export default function VerifyEmailPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function sendCode() {
    setBusy(true);
    setMessage(null);
    setError(null);

    try {
      const result = await authClient.emailOtp.sendVerificationOtp({
        email,
        type: "email-verification",
      });

      if (result.error) {
        setError(result.error.message ?? "Impossible d'envoyer le code.");
        return;
      }

      setSent(true);
      setMessage("Le code de vérification a été envoyé à votre adresse email.");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Impossible d'envoyer le code.");
    } finally {
      setBusy(false);
    }
  }

  async function verifyCode(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage(null);
    setError(null);

    try {
      const result = await authClient.emailOtp.verifyEmail({ email, otp });

      if (result.error) {
        setError(result.error.message ?? "Code invalide ou expiré.");
        return;
      }

      setMessage("Adresse email vérifiée. Vous pouvez maintenant vous connecter.");
      setSent(false);
      setOtp("");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Code invalide ou expiré.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="site-shell auth-page">
      <div className="auth-card">
        <Link className="brand" href="/admin/login" aria-label="Retour à la connexion">
          <span className="brand-mark">N</span>
          <span>nova<span className="brand-accent">.</span></span>
        </Link>
        <p className="eyebrow">Vérification administrateur</p>
        <h1>Votre email.</h1>
        <p className="auth-footnote">Recevez un code Neon Auth pour confirmer votre adresse.</p>

        <label>
          Adresse email
          <input required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>

        {!sent ? (
          <button className="button button-primary" disabled={busy || !email} type="button" onClick={sendCode}>
            {busy ? "Envoi en cours…" : "Recevoir le code"} <span aria-hidden="true">↗</span>
          </button>
        ) : (
          <form onSubmit={verifyCode}>
            <label>
              Code de vérification
              <input required inputMode="numeric" autoComplete="one-time-code" value={otp} onChange={(event) => setOtp(event.target.value)} />
            </label>
            <button className="button button-primary" disabled={busy || !otp} type="submit">
              {busy ? "Vérification…" : "Vérifier l'adresse"} <span aria-hidden="true">↗</span>
            </button>
          </form>
        )}

        {message && <p role="status" className="form-message">{message}</p>}
        {error && <p role="alert" className="form-message">{error}</p>}
        <p className="auth-footnote"><Link href="/admin/login">Retour à la connexion</Link></p>
      </div>
    </main>
  );
}
