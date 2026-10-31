# Décision 0001 — Isolation par client

Date : 31 octobre 2026
Statut : acceptée pour le MVP

## Décision

Chaque client reçoit une installation indépendante : un projet Vercel, une base PostgreSQL Neon, un domaine et des variables propres.

## Raisons

- Réduire le risque de lecture ou de modification des données d'un autre client.
- Simplifier les sauvegardes, le déploiement et le diagnostic.
- Permettre de personnaliser l'identité visuelle, le catalogue, le numéro WhatsApp et les paramètres d'administration sans logique multi-tenant dans le cœur du MVP.

## Conséquences

- La configuration, le thème et les données de catalogue restent séparés du cœur applicatif.
- La procédure de création d'une nouvelle boutique doit empêcher la réutilisation de secrets ou de données d'un autre client.
- Une future plateforme multi-tenant serait un projet distinct, avec une analyse de sécurité et des tests supplémentaires.
