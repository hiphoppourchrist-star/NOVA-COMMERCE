"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  priceCents: number;
  status: string;
};

type ProductResponse = { products?: Product[]; error?: string };
type ProductMutationResponse = { product?: Product; error?: string };

const initialForm = { name: "", slug: "", description: "", priceCents: "0", status: "draft" };

export function AdminProductManager() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function loadProducts() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/products", { cache: "no-store" });
      const data = await response.json() as ProductResponse;
      if (!response.ok) throw new Error(data.error ?? "Impossible de charger les produits.");
      setProducts(data.products ?? []);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Impossible de charger les produits.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timer = window.setTimeout(() => void loadProducts(), 0);
    return () => window.clearTimeout(timer);
  }, []);

  function startEditing(product: Product) {
    setEditingId(product.id);
    setForm({
      name: product.name,
      slug: product.slug,
      description: product.description ?? "",
      priceCents: String(product.priceCents),
      status: product.status,
    });
    setMessage(null);
    setError(null);
  }

  function resetForm() {
    setEditingId(null);
    setForm(initialForm);
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage(null);
    setError(null);

    const payload = {
      name: form.name,
      slug: form.slug,
      description: form.description,
      priceCents: Number(form.priceCents),
      status: form.status,
    };

    try {
      const response = await fetch(editingId ? `/api/admin/products/${editingId}` : "/api/admin/products", {
        method: editingId ? "PATCH" : "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json() as ProductMutationResponse;
      if (!response.ok) throw new Error(data.error ?? "Enregistrement impossible.");
      setMessage(editingId ? "Produit mis à jour." : "Produit créé.");
      resetForm();
      await loadProducts();
      router.refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Enregistrement impossible.");
    } finally {
      setBusy(false);
    }
  }

  async function archiveProduct(product: Product) {
    if (!window.confirm(`Archiver « ${product.name} » ?`)) return;
    setBusy(true);
    setMessage(null);
    setError(null);

    try {
      const response = await fetch(`/api/admin/products/${product.id}`, { method: "DELETE" });
      const data = await response.json() as ProductMutationResponse;
      if (!response.ok) throw new Error(data.error ?? "Archivage impossible.");
      setMessage("Produit archivé.");
      if (editingId === product.id) resetForm();
      await loadProducts();
      router.refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Archivage impossible.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="admin-manager" aria-labelledby="products-title">
      <div className="admin-section-heading">
        <div>
          <p className="eyebrow">Catalogue</p>
          <h2 id="products-title">Gérer les produits</h2>
        </div>
        <button className="button button-secondary" type="button" onClick={() => void loadProducts()} disabled={loading || busy}>
          Actualiser
        </button>
      </div>

      <form className="admin-form" onSubmit={submit}>
        <h3>{editingId ? "Modifier le produit" : "Ajouter un produit"}</h3>
        <div className="admin-form-grid">
          <label>Nom<input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></label>
          <label>Slug<input required pattern="[a-z0-9-]+" value={form.slug} disabled={Boolean(editingId)} onChange={(event) => setForm({ ...form, slug: event.target.value })} /></label>
          <label>Description<textarea maxLength={2000} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} /></label>
          <label>Prix en centimes<input required min="0" type="number" inputMode="numeric" value={form.priceCents} onChange={(event) => setForm({ ...form, priceCents: event.target.value })} /></label>
          <label>État<select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })}><option value="draft">Brouillon</option><option value="published">Publié</option><option value="archived">Archivé</option></select></label>
        </div>
        <div className="admin-form-actions">
          <button className="button button-primary" disabled={busy} type="submit">{busy ? "Enregistrement…" : editingId ? "Enregistrer les changements" : "Créer le produit"} <span aria-hidden="true">↗</span></button>
          {editingId && <button className="button button-secondary" disabled={busy} type="button" onClick={resetForm}>Annuler</button>}
        </div>
        {message && <p role="status" className="form-message form-success">{message}</p>}
        {error && <p role="alert" className="form-message">{error}</p>}
      </form>

      <div className="admin-products" aria-live="polite">
        {loading ? <p className="muted-copy">Chargement des produits…</p> : products.length === 0 ? <p className="muted-copy">Aucun produit enregistré.</p> : products.map((product) => (
          <article className="admin-product-row" key={product.id}>
            <div>
              <p className="eyebrow">{product.status}</p>
              <h3>{product.name}</h3>
              <p>{product.description || "Aucune description."}</p>
            </div>
            <div className="admin-product-meta">
              <strong>{new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(product.priceCents / 100)}</strong>
              <div className="admin-form-actions">
                <button className="button button-secondary" type="button" onClick={() => startEditing(product)}>Modifier</button>
                {product.status !== "archived" && <button className="button button-danger" type="button" onClick={() => void archiveProduct(product)} disabled={busy}>Archiver</button>}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
