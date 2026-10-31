import { eq } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/db/client";
import { products } from "@/db/schema";
import { createWhatsAppLink } from "@/lib/whatsapp";

export const instant = false;
const money = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = db ? (await db.select().from(products).where(eq(products.slug, slug)).limit(1))[0] : undefined;
  if (!product || product.status !== "published") notFound();
  const whatsappLink = createWhatsAppLink(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER, product.name, product.slug);
  return <main className="site-shell"><nav className="topbar" aria-label="Navigation principale"><Link className="brand" href="/" aria-label="Nova Commerce, accueil"><span className="brand-mark">N</span><span>nova<span className="brand-accent">.</span></span></Link><Link className="cart-link" href="/catalogue">Catalogue</Link></nav><article className="product-detail"><div className="product-detail-visual" aria-hidden="true">NOVA</div><div><p className="eyebrow">Collection Nova</p><h1>{product.name}</h1><p className="hero-intro">{product.description ?? "Une pièce choisie avec attention."}</p><strong className="detail-price">{money.format(product.priceCents / 100)}</strong>{whatsappLink ? <a className="button button-primary" href={whatsappLink} target="_blank" rel="noreferrer">Échanger sur WhatsApp <span aria-hidden="true">↗</span></a> : <p className="form-message">Le contact WhatsApp sera bientôt configuré.</p>}<p className="muted-copy">Une question sur ce produit ? L’administrateur vous répond directement sur WhatsApp.</p></div></article></main>;
}
