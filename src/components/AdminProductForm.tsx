"use client";
import { useState } from "react";
export function AdminProductForm() {
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setMessage(null);
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/products", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ name: form.get("name"), slug: form.get("slug"), description: form.get("description"), priceCents: Number(form.get("priceCents")), status: "draft" }) });
    const data = await response.json() as { error?: string; product?: { name: string } };
    setBusy(false); setMessage(response.ok ? "Produit " + (data.product?.name ?? "") + " créé en brouillon." : data.error ?? "Création impossible.");
    if (response.ok) event.currentTarget.reset();
  }
  return <form className="admin-form" onSubmit={submit}><h2>Ajouter un produit</h2><label>Nom<input required name="name" /></label><label>Slug<input required name="slug" pattern="[a-z0-9-]+" /></label><label>Description<textarea name="description" maxLength={2000} /></label><label>Prix en centimes<input required name="priceCents" type="number" min="0" /></label><button className="button button-primary" disabled={busy} type="submit">{busy ? "Création…" : "Créer le brouillon"} <span aria-hidden="true">↗</span></button>{message && <p role="status" className="form-message">{message}</p>}</form>;
}
