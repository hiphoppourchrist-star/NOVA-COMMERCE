# Questions ouvertes et interventions humaines

Le développement local peut continuer sans bloquer sur ces sujets. Les valeurs par défaut restent réversibles.

## À valider avant publication

| Sujet | Décision attendue |
|---|---|
| Identité visuelle | Logo, couleurs, typographies et visuels de Nova Commerce |
| Catalogue | Catégories, descriptions, prix, devise et variantes à publier |
| WhatsApp | Numéro professionnel international et message commercial souhaité |
| Contenus | Mentions légales, confidentialité, retours et coordonnées |
| Stock | Signification métier des quantités et règle d'affichage de disponibilité |
| Données | Durée de conservation des données administratives et procédure d'export |

## Hypothèses actuelles

- Nova Commerce utilise un projet Vercel et une base Neon dédiés.
- Les visiteurs ne créent pas de compte et aucune donnée client n'est stockée par l'application.
- L'intérêt pour un produit est traité hors application dans WhatsApp.
- L'administrateur est identifié par Neon Auth et autorisé par `ADMIN_EMAILS`.
- Les produits archivés restent en base mais ne sont plus visibles dans le catalogue public.
- Les images sont stockées dans Neon Object Storage, jamais sur le disque éphémère de Vercel.

## Intervention du propriétaire

Le propriétaire doit saisir les secrets uniquement dans les variables sécurisées de l'environnement concerné. Il ne doit jamais les envoyer dans le chat ni les committer. La configuration Vercel, le domaine/DNS et la publication Production nécessitent une validation explicite.
