# Nova Commerce

Template de boutique e-commerce simplifiée : catalogue par catégories, prix visibles et prise de contact WhatsApp avec l’administrateur.

## Périmètre

- Interface publique sans compte visiteur/client.
- Aucun panier, checkout, paiement ou module de livraison.
- Uniquement un accès administrateur via Neon Auth.
- Produits gérés depuis l’espace `/admin`.
- PostgreSQL Neon avec Drizzle ORM.
- Images administrables avec stockage objet Neon et URLs présignées.

Voir [le périmètre détaillé](./docs/SIMPLIFIED_SCOPE.md).

## Développement

```bash
npm ci
npm run dev
```

Variables importantes :

- `DATABASE_URL` et `DATABASE_URL_UNPOOLED` pour Neon ;
- `NEON_AUTH_BASE_URL` et `NEON_AUTH_COOKIE_SECRET` pour l’administration ;
- `ADMIN_EMAILS` pour l’allowlist administrateur ;
- `NEXT_PUBLIC_WHATSAPP_NUMBER` pour les boutons de contact.

## Contrôles

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

Ne jamais ajouter de secret dans Git ou dans le chat. Voir [le guide de déploiement](./docs/DEPLOYMENT.md), [la sécurité](./docs/SECURITY.md) et [la checklist production](./docs/PRODUCTION_CHECKLIST.md).
