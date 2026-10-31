# État réel de réalisation — 31 octobre 2026

## Fonctionnel présent

- Next.js App Router, TypeScript strict, Tailwind CSS, design responsive.
- PostgreSQL Neon avec Drizzle, migrations et schéma catégories / produits / variantes / commandes / lignes / mouvements de stock.
- Catalogue connecté, recherche et filtres de prix côté serveur.
- Panier local, recalcul serveur, commande transactionnelle, stock atomique et idempotence.
- Neon Auth avec inscription, connexion, session et espace compte.
- Administration protégée par session et `ADMIN_EMAILS`, avec lecture des alertes de stock.
- Adaptateur de paiement sandbox et adaptateur de stockage durable à configurer.

## Contrôles réellement exécutés

- `npm run lint` : réussi.
- `npm run typecheck` : réussi.
- `npm run test` : réussi, 3 tests sur 3.
- `npm run build` : réussi.
- `npm run db:migrate` : réussi sur la branche Neon liée.
- Application compilée démarrée sur `http://localhost:3000`.
- Pages `/catalogue`, `/panier`, `/auth/sign-in` et `/admin` vérifiées en HTTP.
- Checkout invalide vérifié : réponse `400` sans création de commande.
- Neon Auth vérifié : `/api/auth/get-session` répond `200` avec session anonyme `null`.

## Pas encore production-ready

Le projet n’est pas déclaré terminé à 100 % : paiement réel, webhooks signés, livraison, uploads S3, rôles fins, CRUD admin, historique de commandes lié au compte, rate limiting distribué, tests E2E/accessibilité complets et validation juridique restent à implémenter ou configurer. Ces limites sont détaillées dans [`SECURITY.md`](./SECURITY.md) et [`PRODUCTION_CHECKLIST.md`](./PRODUCTION_CHECKLIST.md).
