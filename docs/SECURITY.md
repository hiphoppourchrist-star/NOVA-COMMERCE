# Rapport de sécurité — boutique simplifiée

## Mesures présentes

- Les produits sont lus côté serveur depuis PostgreSQL.
- Les mutations administratives vérifient la session Neon Auth et l’allowlist `ADMIN_EMAILS`.
- Les entrées des produits et uploads sont validées avec Zod.
- Les suppressions de produits sont remplacées par un archivage.
- Les secrets restent côté serveur et `.env.local` est ignoré par Git.
- Les URLs d’upload sont présignées et limitées dans le temps.
- Des en-têtes de sécurité sont ajoutés par Next.js.
- Aucun paiement, donnée bancaire, adresse client ou compte client n’est géré.

## Limites

- Le rate limiting distribué n’est pas nécessaire pour le parcours public actuel, mais devra être ajouté si de nouveaux endpoints sensibles apparaissent.
- Le compte administrateur et ses secrets doivent être configurés dans Neon/Vercel, jamais dans Git.
- Les tables historiques de commandes et promotions ne sont pas supprimées pour éviter une action destructive ; elles ne sont pas exposées par l’application.
- Une revue indépendante reste recommandée avant publication.

Ce document ne constitue pas une garantie de sécurité absolue.
