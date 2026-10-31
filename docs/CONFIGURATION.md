# Configuration de Nova Commerce

Nova Commerce est déployé comme une application unique avec son projet Vercel, sa base Neon et son domaine.

Les couleurs et textes sont centralisés dans `src/app/globals.css` et les métadonnées dans `src/app/layout.tsx`. Les produits, catégories et variantes appartiennent à la base Neon de l'application. Le numéro WhatsApp public et les secrets d'administration/stockage doivent être saisis dans les variables sécurisées de Vercel, jamais dans Git.

La procédure de configuration consiste à appliquer les migrations, renseigner l'identité visuelle de Nova Commerce, ajouter le catalogue et faire valider les textes commerciaux et juridiques.
