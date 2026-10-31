# Audit initial du projet

Date de l’audit : 31 octobre 2026  
Périmètre : dépôt local `NOVA-COMMERCE` et cahier des charges fourni.

## Résumé

Le dépôt est un squelette documentaire, pas encore une application. Il n’y a actuellement ni code applicatif, ni dépendances, ni base de données, ni migrations, ni configuration de test ou de déploiement.

Le cahier des charges décrit un template réutilisable selon le modèle **une boutique = un dépôt/projet Vercel = une base Neon**, avec personnalisation par configuration et isolation complète entre clients. Cette décision réduit le risque de fuite inter-client et doit rester la cible de la première version.

## État vérifié

| Élément | État constaté | Conséquence |
|---|---|---|
| Fichiers suivis par Git | 1 | Initialisation complète à réaliser |
| Code source | Absent | Aucun comportement existant à préserver |
| `package.json` et lockfile | Absents | Choix et installation de la stack à faire |
| Next.js / React / TypeScript | Absents | Aucun framework initialisé |
| Base PostgreSQL / ORM / migrations | Absents | Modèle de données à concevoir |
| Authentification / autorisation | Absentes | À concevoir côté serveur dès le socle |
| Tests / lint / typecheck / build | Absents | À installer avec la première phase |
| Variables d’environnement | Absentes | À documenter sans secret |
| CI/CD / Vercel / Neon | Absents | Préparation locale uniquement à ce stade |
| Stockage images / e-mail / paiement | Absents | Adaptateurs et modes sandbox à prévoir |
| Documentation | Cahier des charges uniquement | Documentation technique à créer |

## Outils locaux vérifiés

- Node.js : `v26.8.1`
- npm : `11.19.0`
- Git : `2.56.0.windows.4`
- Branche : `main`, synchronisée avec `origin/main` au moment de l’audit
- Historique : un commit initial `6633131` (`first commit`)
- Aucun fichier non suivi ou changement local constaté lors de l’audit

## Exigences structurantes retenues

1. TypeScript strict, Next.js App Router, React et Tailwind CSS.
2. PostgreSQL sur Neon, avec un ORM unique et des migrations versionnées.
3. Validation serveur avec Zod ou équivalent.
4. Prix et quantités représentés sans calcul monétaire flottant ordinaire.
5. Autorisation serveur pour chaque opération sensible.
6. Paiements derrière une interface d’adaptateur, en sandbox tant que le compte marchand n’est pas configuré.
7. Images conservées dans un stockage durable externe, jamais dans le disque éphémère de Vercel.
8. Environnements local, preview et production séparés.
9. Tests unitaires, intégration, autorisation et parcours navigateur critiques.
10. Aucune publication, configuration de domaine, migration distante ou utilisation de secret réel dans cette phase.

## Risques principaux

- **Élevé — périmètre large** : catalogue, commande, stock, promotions, paiement et administration forment plusieurs sous-systèmes transactionnels. Le développement doit être incrémental.
- **Élevé — paiements** : le fournisseur dépend du pays, de la devise et du contrat marchand. Aucun choix de fournisseur réel ne doit être figé sans validation.
- **Élevé — stock et commandes** : les écritures concurrentes doivent être atomiques et couvertes par des tests de non-survente.
- **Élevé — authentification** : le fournisseur et le flux d’e-mail doivent être compatibles avec les environnements Next.js et la politique de confidentialité retenue.
- **Moyen — règles commerciales** : taxes, retours, livraison, retrait et conservation des données ne sont pas encore spécifiés pour un pays donné.
- **Moyen — contenu légal** : les pages juridiques doivent venir du propriétaire ou d’un professionnel compétent, jamais être présentées comme validées par défaut.
- **Moyen — stockage média** : un fournisseur externe doit être choisi avant d’activer l’upload administrateur.
- **Faible — identité visuelle** : le thème doit être centralisé pour rester remplaçable sans modifier le cœur métier.

## Conclusion de l’audit

Le projet peut démarrer immédiatement par l’initialisation du socle, sans intervention externe. Les prochaines actions sûres sont la création de la structure Next.js, l’outillage qualité, le thème initial et une première documentation technique. Les comptes Neon, Vercel, paiement, e-mail et stockage ne sont pas nécessaires pour cette phase locale.

