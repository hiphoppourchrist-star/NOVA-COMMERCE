import Link from "next/link";
import { asc, count, eq, lt } from "drizzle-orm";
import { connection } from "next/server";
import { AdminProductForm } from "@/components/AdminProductForm";
import { auth } from "@/lib/auth/server";
import { db } from "@/db/client";
import { products, productVariants } from "@/db/schema";
export const instant = false;
export default async function AdminPage() {
  await connection();
  const { data } = await auth.getSession();
  const allowed = (process.env.ADMIN_EMAILS ?? "").split(",").map((email) => email.trim().toLowerCase()).filter(Boolean);
  if (!data?.user) return <main className="site-shell auth-page"><div className="auth-card"><h1>Administration.</h1><p>Connectez-vous pour accéder à cet espace.</p><Link className="button button-primary" href="/admin/login">Se connecter <span aria-hidden="true">↗</span></Link></div></main>;
  if (!allowed.includes(data.user.email.toLowerCase())) return <main className="site-shell auth-page"><div className="auth-card"><h1>Accès refusé.</h1><p>Ce compte n’est pas autorisé à administrer cette boutique.</p></div></main>;
  const published = db ? (await db.select({ value: count() }).from(products).where(eq(products.status, "published")))[0]?.value ?? 0 : 0;
  const lowStock = db ? await db.select({ sku: productVariants.sku, stock: productVariants.stockQuantity }).from(productVariants).where(lt(productVariants.stockQuantity, 5)).orderBy(asc(productVariants.stockQuantity)).limit(10) : [];
  return <main className="site-shell admin-page"><nav className="topbar"><Link className="brand" href="/">nova<span className="brand-accent">.</span></Link><Link className="cart-link" href="/catalogue">Voir la boutique</Link></nav><section className="admin-content"><p className="eyebrow">Espace protégé</p><h1>Administration.</h1><div className="admin-stats"><div><span>Produits publiés</span><strong>{published}</strong></div><div><span>Alertes stock</span><strong>{lowStock.length}</strong></div></div><AdminProductForm /><section className="admin-panel"><h2>Stock à surveiller</h2>{lowStock.length ? <ul>{lowStock.map((item) => <li key={item.sku}><span>{item.sku}</span><strong>{item.stock}</strong></li>)}</ul> : <p>Aucune alerte de stock.</p>}</section><p className="muted-copy">Les produits sont archivés plutôt que supprimés pour préserver l’historique des commandes.</p></section></main>;
}
