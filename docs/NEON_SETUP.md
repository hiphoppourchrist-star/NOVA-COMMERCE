# Configuration Neon

Le projet utilise uniquement les primitives nécessaires à la boutique simplifiée :

- PostgreSQL pour catégories, produits et variantes ;
- Neon Auth pour le seul administrateur ;
- Object Storage pour les médias produits.

Les fonctions, realtime et AI Gateway ne sont pas utilisées par l’application simplifiée. `neon.ts` ne les déclare plus. Les ressources historiques éventuellement déjà déployées dans Neon ne sont pas supprimées automatiquement.

## Variables

`DATABASE_URL` est utilisé par l’application et `DATABASE_URL_UNPOOLED` par les migrations. Les variables d’authentification et de stockage sont server-only, sauf `NEXT_PUBLIC_WHATSAPP_NUMBER`, qui est volontairement public pour construire les liens WhatsApp.

Ne jamais copier les valeurs de `.env.local` dans Git ou dans le chat.
