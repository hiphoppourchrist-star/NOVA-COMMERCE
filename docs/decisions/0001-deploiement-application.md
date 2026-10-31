# Décision 0001 — Déploiement de l'application

Date : 31 octobre 2026
Statut : acceptée

## Décision

Nova Commerce est une application unique déployée avec un projet Vercel, une base PostgreSQL Neon, un domaine et des variables propres.

## Raisons

- Réduire le risque de lecture ou de modification de données externes.
- Simplifier les sauvegardes, le déploiement et le diagnostic.
- Garder une séparation claire entre configuration, interface et données de l'application.

## Conséquences

- Les secrets restent propres à Nova Commerce et ne sont jamais réutilisés depuis un autre projet.
- Les environnements local, Preview et Production sont configurés séparément.
- Les fonctionnalités de plateforme multi-boutiques n'appartiennent pas au périmètre actuel.
