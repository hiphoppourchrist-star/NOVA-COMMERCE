# Base de données

Le socle utilise PostgreSQL Neon avec Drizzle ORM et `@neondatabase/serverless`.

- `DATABASE_URL` est la connexion poolée destinée aux requêtes applicatives.
- `DATABASE_URL_UNPOOLED` est la connexion directe destinée aux migrations.
- Les prix sont stockés en centimes entiers (`price_cents`), jamais en flottants.
- Les migrations sont versionnées dans `drizzle/`.
- Le modèle actif couvre catégories, produits et variantes avec leur disponibilité.

## Historique conservé

Les migrations historiques ont créé des tables de commandes, lignes de commande, mouvements de stock et promotions. Elles sont conservées pour ne pas supprimer de données potentiellement existantes. Le code actif de la boutique simplifiée ne les lit ni ne les modifie. Toute suppression devra faire l'objet d'une validation humaine et d'une migration destructive dédiée.
