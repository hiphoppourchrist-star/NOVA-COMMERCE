import Link from "next/link";
import { asc, count, eq, lt } from "drizzle-orm";
import { connection } from "next/server";
import { AdminProductManager } from "@/components/AdminProductManager";
import { AdminSignOutButton } from "@/components/AdminSignOutButton";
import { db } from "@/db/client";
import { products, productVariants } from "@/db/schema";
import { getAdminContext } from "@/lib/admin/authorization";

export default async function AdminPage() {
  await connection();
  const { user, configured, isAdmin, configurationError } = await getAdminContext();

  if (configurationError) {
    return (
      <main className="site-shell auth-page">
        <div className="auth-card">
          <p className="eyebrow">Configuration requise</p>
          <h1>Neon Auth.</h1>
          <p>{configurationError}</p>
          <p>Ajoutez les variables sécurisées requises dans Vercel, puis relancez le déploiement.</p>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="site-shell auth-page">
        <div className="auth-card">
          <p className="eyebrow">Espace sécurisé</p>
          <h1>Administration.</h1>
          <p>Connectez-vous pour gérer le catalogue Nova Commerce.</p>
          <Link className="button button-primary" href="/admin/login">
            Se connecter <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </main>
    );
  }

  if (!configured) {
    return (
      <main className="site-shell auth-page">
        <div className="auth-card">
          <p className="eyebrow">Configuration requise</p>
          <h1>ADMIN_EMAILS.</h1>
          <p>
            Votre session est valide, mais aucun administrateur n&apos;est configuré.
            Ajoutez votre adresse email dans la variable sécurisée
            <code>ADMIN_EMAILS</code>, puis rechargez cette page.
          </p>
        </div>
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="site-shell auth-page">
        <div className="auth-card">
          <p className="eyebrow">Accès refusé</p>
          <h1>Compte non autorisé.</h1>
          <p>Cette adresse ne figure pas dans la liste des administrateurs.</p>
          <AdminSignOutButton />
        </div>
      </main>
    );
  }

  const published = db
    ? (await db.select({ value: count() }).from(products).where(eq(products.status, "published")))[0]?.value ?? 0
    : 0;
  const lowStock = db
    ? await db
        .select({ sku: productVariants.sku, stock: productVariants.stockQuantity })
        .from(productVariants)
        .where(lt(productVariants.stockQuantity, 5))
        .orderBy(asc(productVariants.stockQuantity))
        .limit(10)
    : [];

  return (
    <main className="site-shell admin-page">
      <nav className="topbar" aria-label="Navigation administration">
        <Link className="brand" href="/" aria-label="Nova Commerce, accueil">
          <span className="brand-mark">N</span>
          <span>nova<span className="brand-accent">.</span></span>
        </Link>
        <div className="nav-links">
          <Link href="/catalogue">Voir la boutique</Link>
          <span className="admin-user">{user.email}</span>
        </div>
      </nav>
      <section className="admin-content">
        <div className="admin-heading">
          <div>
            <p className="eyebrow">Espace protégé</p>
            <h1>Administration.</h1>
          </div>
          <AdminSignOutButton />
        </div>
        <div className="admin-stats">
          <div><span>Produits publiés</span><strong>{published}</strong></div>
          <div><span>Alertes stock</span><strong>{lowStock.length}</strong></div>
        </div>
        <AdminProductManager />
        <section className="admin-panel">
          <p className="eyebrow">Surveillance</p>
          <h2>Stock à surveiller</h2>
          {lowStock.length ? (
            <ul>{lowStock.map((item) => <li key={item.sku}><span>{item.sku}</span><strong>{item.stock}</strong></li>)}</ul>
          ) : <p>Aucune alerte de stock.</p>}
        </section>
      </section>
    </main>
  );
}
