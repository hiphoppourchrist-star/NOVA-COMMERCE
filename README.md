# Nova Commerce

Nova Commerce est une application e-commerce simplifiée pour présenter un catalogue par catégories, afficher les prix et permettre aux visiteurs de contacter l'administrateur sur WhatsApp.

## Fonctionnalités

- Interface publique sans compte visiteur ou client.
- Catalogue avec catégories, recherche, filtres et fiches produits.
- Prix et disponibilité issus de PostgreSQL Neon.
- Contact WhatsApp avec message prérempli pour chaque produit.
- Accès administrateur via Neon Auth.
- Gestion des produits depuis `/admin`.
- Images stockées dans Neon Object Storage avec URLs présignées.

Voir le [périmètre fonctionnel](./docs/SIMPLIFIED_SCOPE.md).

## Développement

```bash
npm ci
npm run dev
```

Variables importantes :

- `DATABASE_URL` et `DATABASE_URL_UNPOOLED` pour Neon ;
- `NEON_AUTH_BASE_URL` et `NEON_AUTH_COOKIE_SECRET` pour l'administration ;
- `ADMIN_EMAILS` pour autoriser l'administrateur ;
- `NEXT_PUBLIC_WHATSAPP_NUMBER` pour les boutons de contact.

## Contrôles

```bash
npm run lint
npm run typecheck
npm run test
npm run build
npm audit
```

Ne jamais ajouter de secret dans Git ou dans le chat. Voir le [guide de déploiement](./docs/DEPLOYMENT.md), le [rapport de sécurité](./docs/SECURITY.md) et la [checklist de production](./docs/PRODUCTION_CHECKLIST.md).

