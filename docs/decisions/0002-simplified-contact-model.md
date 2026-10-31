# Décision 0002 — Catalogue public et contact WhatsApp

## Décision

Nova Commerce ne gère pas les paiements, la livraison, les commandes ni les comptes visiteurs/clients. L'application présente les produits et leurs prix, puis ouvre WhatsApp avec un message prérempli pour le produit consulté.

Seul l'administrateur dispose d'un compte Neon Auth. L'accès d'administration est ensuite limité côté serveur aux adresses de `ADMIN_EMAILS`.

## Raisons

- Réduire le périmètre et le risque de traitement de données personnelles.
- Éviter de simuler une commande ou un paiement sans contrat commercial.
- Adapter Nova Commerce à une vente conclue dans une conversation.
- Garder une application claire et simple à maintenir.

## Conséquences

- Les anciennes tables de commande/promotions ne sont pas supprimées pour préserver la base existante.
- Le numéro WhatsApp est une configuration d'environnement publique et doit être validé avant publication.
- Les boutons du catalogue ont un effet réel : navigation ou ouverture de WhatsApp ; aucun succès de commande n'est affiché.
