# Décision 0002 — Catalogue public et contact WhatsApp

## Décision

Le template ne gère pas les paiements, la livraison, les commandes ni les comptes visiteurs/clients. Il présente les produits et leurs prix, puis ouvre WhatsApp avec un message prérempli pour le produit consulté.

Seul l'administrateur dispose d'un compte Neon Auth. L'accès d'administration est ensuite limité côté serveur aux adresses de `ADMIN_EMAILS`.

## Raisons

- Réduire le périmètre et le risque de traitement de données personnelles.
- Éviter de simuler une commande ou un paiement sans contrat commercial.
- Adapter le template aux boutiques qui concluent la vente dans une conversation.
- Garder un catalogue réutilisable, simple à déployer pour chaque client.

## Conséquences

- Les anciennes tables de commande/promotions ne sont pas supprimées pour préserver la base existante.
- Le numéro WhatsApp est une configuration d'environnement publique et doit être validé avant publication.
- Les boutons du catalogue ont un effet réel : navigation ou ouverture de WhatsApp ; aucun succès de commande n'est affiché.
