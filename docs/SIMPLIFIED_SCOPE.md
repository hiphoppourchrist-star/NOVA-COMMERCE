# Périmètre de Nova Commerce

## Parcours public

- Consulter l'accueil.
- Parcourir le catalogue par catégorie.
- Rechercher et filtrer par prix.
- Ouvrir une fiche produit et voir son prix.
- Cliquer sur WhatsApp pour contacter l'administrateur avec un message prérempli.

Il n'existe volontairement pas de panier, checkout, paiement, livraison, compte client ou inscription visiteur.

## Parcours administrateur

- Se connecter avec le compte Neon Auth de l'administrateur.
- Être accepté uniquement si l'adresse figure dans `ADMIN_EMAILS`.
- Créer, modifier, publier ou archiver des produits.
- Consulter les catégories et les alertes de disponibilité existantes.

## Configuration nécessaire

- Renseigner `NEXT_PUBLIC_WHATSAPP_NUMBER` dans les environnements local, Preview et Production.
- Créer le compte administrateur dans Neon Auth puis renseigner son adresse dans `ADMIN_EMAILS`.
- Configurer les variables Vercel et le domaine de Nova Commerce.

Les tables historiques de commandes et promotions ne sont pas supprimées de Neon : une suppression de colonnes ou de tables serait destructive. Elles ne sont plus importées par les routes publiques et seront traitées séparément après validation explicite.

