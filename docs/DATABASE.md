# Base de données

Le socle utilise PostgreSQL Neon avec Drizzle ORM et `@neondatabase/serverless`.

- `DATABASE_URL` est la connexion poolée destinée aux requêtes applicatives.
- `DATABASE_URL_UNPOOLED` est la connexion directe destinée aux migrations.
- Les montants sont stockés en centimes entiers (`price_cents`), jamais en flottants.
- Les migrations sont générées dans `drizzle/` avec `npm run db:generate`.
- Leur application distante se fait avec `npm run db:migrate`, après vérification de la branche et des variables.

Le modèle initial couvre catégories, produits et variantes avec stock. Les commandes, promotions et comptes seront ajoutés par phases verticales.
