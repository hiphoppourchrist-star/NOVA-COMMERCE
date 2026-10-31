# État réel de réalisation

## Fonctionnel

- Catalogue public avec catégories, recherche, filtres de prix et fiches produits.
- Prix affichés depuis PostgreSQL, sans calcul monétaire flottant.
- Contact WhatsApp par produit avec message prérempli et état non configuré explicite.
- Administration protégée par Neon Auth et `ADMIN_EMAILS`.
- CRUD produit côté serveur avec validation Zod et archivage non destructif.
- Upload d'images préparé pour Neon Object Storage.
- Aucun compte client, panier, commande, paiement ou livraison dans le périmètre actif.

## Contrôles réellement exécutés

- `npm run lint` : réussi.
- `npm run typecheck` : réussi.
- `npm run test` : réussi, 2 tests sur 2.
- `npm run build` : réussi.
- Vérification HTTP locale : pages publiques en `200`, API d'administration anonyme en `403`.
- Vérification HTTP des anciens parcours : `/panier`, `/compte`, `/auth/sign-in`, `/auth/sign-up` et `/api/checkout` en `404`.
- Vérification Neon : connexion PostgreSQL et génération d'une URL présignée de stockage réalisées précédemment.

## Limites restantes

La configuration des secrets, du numéro WhatsApp, du compte administrateur, de Vercel et du domaine doit être faite par le propriétaire dans les interfaces sécurisées correspondantes. Les anciennes tables de commandes/promotions sont conservées en base pour éviter une migration destructive, mais aucun code actif ne les utilise.
