# Décision 0001 — Isolation par client

Date : 31 octobre 2026  
Statut : acceptée pour le MVP

## Décision

Chaque client reçoit une installation indépendante : un dépôt ou projet dérivé du template, un projet Vercel, une base PostgreSQL Neon et des secrets propres.

## Raisons

- Réduit le risque de lecture ou de modification des données d’un autre client.
- Simplifie les sauvegardes, le déploiement et le diagnostic.
- Permet de personnaliser identité visuelle, catalogue, paiement et livraison sans logique multi-tenant dans le cœur du MVP.
- Correspond explicitement au cahier des charges fourni.

## Conséquences

- Le template doit séparer configuration, thème et règles métier.
- La procédure de création d’une nouvelle boutique doit empêcher la réutilisation de secrets ou de données d’un autre client.
- Une future plateforme multi-tenant serait un projet distinct, avec une analyse de sécurité et des tests supplémentaires.

