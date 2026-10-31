# Déploiement Vercel + Neon

1. Créer un projet Vercel et une base Neon séparés pour chaque client.
2. Configurer les variables de `.env.example` dans Development, Preview et Production.
3. Créer le compte administrateur avec Neon Auth.
4. Ajouter son adresse exacte dans `ADMIN_EMAILS`.
5. Renseigner `NEXT_PUBLIC_WHATSAPP_NUMBER` avec le numéro au format international.
6. Appliquer les migrations avec `DATABASE_URL_UNPOOLED` avant la première publication.
7. Vérifier le catalogue, les catégories, les prix, la connexion admin et les liens WhatsApp.
8. Configurer le domaine et le DNS uniquement après validation humaine.

Cette application ne possède volontairement aucun paiement, service de livraison, panier ou compte client.
