# État actuel — boutique simplifiée

## Fonctionnel

- Catalogue public connecté à PostgreSQL.
- Catégories, recherche et filtres de prix.
- Fiches produits avec prix et bouton WhatsApp contextualisé.
- Authentification réservée à l’administration.
- Création, modification et archivage des produits côté admin.
- Validation serveur Zod, contrôle d’accès et en-têtes de sécurité.
- Stockage objet Neon conservé pour les médias administrables.

## Retiré du code applicatif

- panier ;
- checkout ;
- paiements sandbox ou réels ;
- livraison ;
- comptes client et inscription visiteur ;
- promotions et rate limiting liés au checkout.

Les anciennes tables de commandes/promotions déjà présentes dans Neon sont conservées comme historique afin d’éviter une migration destructive. Elles ne sont plus utilisées par l’application.

## Configuration humaine nécessaire

- créer le compte administrateur dans Neon Auth ;
- renseigner son adresse dans `ADMIN_EMAILS` ;
- renseigner le numéro WhatsApp dans `NEXT_PUBLIC_WHATSAPP_NUMBER` ;
- configurer les variables Preview/Production dans Vercel.
