# Personnalisation par client

Le template est prévu pour un déploiement isolé : un client possède son projet Vercel, sa base Neon, son domaine et ses variables secrètes.

Les couleurs et textes sont centralisés dans `src/app/globals.css` et les métadonnées dans `src/app/layout.tsx`. Les produits, catégories, variantes et stocks appartiennent à la base Neon du client. Les secrets de paiement, e-mail et stockage doivent être saisis dans les variables sécurisées de Vercel, jamais dans Git.

Avant chaque nouveau client, créer une base Neon et une branche de test, appliquer les migrations, configurer l’identité visuelle, puis faire valider les textes commerciaux et juridiques.
