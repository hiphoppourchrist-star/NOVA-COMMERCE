import { and, asc, eq, gte, ilike, lte } from "drizzle-orm";
import Link from "next/link";
import { db } from "@/db/client";
import { categories, products } from "@/db/schema";
export const instant = false;
const money = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });
export default async function CataloguePage({ searchParams }: { searchParams: Promise<{ q?: string; min?: string; max?: string; category?: string }> }) {
  const params = await searchParams;
  const query = params.q?.trim().slice(0, 80);
  const categorySlug = params.category?.trim().slice(0, 80);
  const min = params.min && /^\d+$/.test(params.min) ? Number(params.min) * 100 : undefined;
  const max = params.max && /^\d+$/.test(params.max) ? Number(params.max) * 100 : undefined;
  const filters = [eq(products.status, "published")];
  if (query) filters.push(ilike(products.name, `%${query}%`));
  if (min !== undefined) filters.push(gte(products.priceCents, min));
  if (max !== undefined) filters.push(lte(products.priceCents, max));
  if (categorySlug) filters.push(eq(categories.slug, categorySlug));
  const result = db ? await db.select({ product: products, category: categories }).from(products).leftJoin(categories, eq(products.categoryId, categories.id)).where(and(...filters)).orderBy(asc(products.createdAt)) : [];
  const categoryList = db ? await db.select().from(categories).orderBy(asc(categories.name)) : [];
  return <main className="site-shell"><nav className="topbar" aria-label="Navigation principale"><Link className="brand" href="/" aria-label="Nova Commerce, accueil"><span className="brand-mark">N</span><span>nova<span className="brand-accent">.</span></span></Link><Link className="cart-link" href="/admin">Administration</Link></nav><section className="collection" aria-labelledby="catalogue-title"><div><p className="eyebrow">La sélection Nova</p><h1 id="catalogue-title">Le catalogue<br /><em>par catégorie.</em></h1></div><p className="hero-intro">Choisissez un produit et échangez directement avec l’administrateur sur WhatsApp.</p></section><nav className="category-links" aria-label="Catégories"><Link className={!categorySlug ? "active" : ""} href="/catalogue">Tous</Link>{categoryList.map((category) => <Link className={category.slug === categorySlug ? "active" : ""} href={`/catalogue?category=${category.slug}`} key={category.id}>{category.name}</Link>)}</nav><form className="catalogue-filters" method="get" aria-label="Filtrer le catalogue"><input type="hidden" name="category" value={categorySlug ?? ""} /><label>Rechercher<input name="q" defaultValue={query} placeholder="Nom du produit" /></label><label>Prix min. (€)<input name="min" inputMode="numeric" pattern="[0-9]*" defaultValue={params.min} /></label><label>Prix max. (€)<input name="max" inputMode="numeric" pattern="[0-9]*" defaultValue={params.max} /></label><button className="button button-primary" type="submit">Filtrer <span aria-hidden="true">↗</span></button></form><section className="product-grid" aria-label="Produits disponibles">{result.length === 0 ? <div className="empty-state"><p className="eyebrow">Aucun résultat</p><h2>La collection se prépare.</h2><p>Modifiez votre recherche ou revenez plus tard.</p><Link className="text-link" href="/catalogue">Réinitialiser les filtres</Link></div> : result.map(({ product, category }) => <Link className="product-card" href={`/catalogue/${product.slug}`} key={product.id}><div className="product-visual" aria-hidden="true">NOVA</div><div className="product-meta"><p className="eyebrow">{category?.name ?? "Collection"}</p><h2>{product.name}</h2><p>{product.description ?? "Une pièce choisie avec attention."}</p><strong>{money.format(product.priceCents / 100)}</strong></div></Link>)}</section></main>;
}
