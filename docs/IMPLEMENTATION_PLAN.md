# Plan d’implémentation

Statut global : **phase 1 — socle technique initial validé ; design system à poursuivre**.

## Principes de réalisation

- Livrer un parcours vertical vérifiable avant d’ajouter les fonctions secondaires.
- Garder les règles de prix, stock, commande et autorisation côté serveur.
- Utiliser des adaptateurs explicites pour le paiement, l’e-mail et le stockage.
- Ne jamais utiliser de données ou de succès fictifs en dehors d’un mode de développement clairement identifié.
- Exécuter les contrôles pertinents après chaque phase : lint, typecheck, tests et build.

## Phases

### Phase 0 — Audit et cadrage — terminée

- [x] Inspecter le contenu et l’historique Git.
- [x] Vérifier les outils locaux disponibles.
- [x] Confirmer l’absence de code et de configuration existants.
- [x] Identifier les risques et les décisions humaines.
- [x] Écrire l’audit et le plan.

### Phase 1 — Socle technique et design system — en cours

- [x] Initialiser Next.js App Router avec TypeScript strict.
- [x] Installer Tailwind CSS et l’outillage qualité minimal.
- [x] Ajouter le lockfile et les scripts de lint, typecheck et build.
- [ ] Définir l’architecture `app`, `components`, `lib`, `domain`, `infrastructure` et `tests`.
- [ ] Créer le thème sombre personnalisable, les layouts, la navigation et les états loading/error/not-found.
- [ ] Ajouter `.env.example` et les règles Git d’exclusion des secrets.
- [x] Vérifier lint, typecheck et build.

Résultats vérifiés le 31 octobre 2026 : `npm run lint`, `npm run typecheck` et `npm run build` réussissent dans le socle initial. Aucun parcours métier n’est encore implémenté.

### Phase 2 — Base de données et domaine catalogue — en cours

- [x] Choisir et documenter Drizzle ORM avec le driver Neon HTTP pour Next.js.
- [x] Modéliser produits, variantes, catégories, prix et stock.
- [x] Générer une première migration locale non destructive.
- [x] Appliquer la migration initiale sur la branche Neon `production`.
- [x] Ajouter la première page catalogue connectée à PostgreSQL avec état vide explicite.
- [x] Ajouter une fiche produit par slug et un seed de développement protégé.
- [ ] Ajouter médias, seed de développement explicitement identifié et contraintes métier complémentaires.
- [ ] Implémenter catalogue, catégories, recherche, filtres, tri, fiche produit et SEO de base.
- [ ] Ajouter tests unitaires des règles de prix, variantes et disponibilité.

### Phase 3 — Panier et commande sans paiement réel

- [ ] Implémenter panier persistant et recalcul serveur des montants.
- [ ] Implémenter validation serveur des coordonnées, livraison et consentements.
- [ ] Ajouter promotions déterministes et règles de cumul documentées.
- [ ] Créer commande, lignes immuables, stock atomique et idempotence des soumissions.
- [ ] Ajouter tests d’intégration base de données, concurrence de stock et autorisation.

### Phase 4 — Authentification et comptes

- [ ] Sélectionner une solution d’authentification maintenue après vérification de compatibilité.
- [ ] Implémenter inscription, connexion, déconnexion, réinitialisation et protection contre l’énumération.
- [ ] Ajouter profils, adresses et historique de commandes avec contrôle de propriété.
- [ ] Ajouter rôles administrateur et propriétaire, contrôlés côté serveur.
- [ ] Tester les accès autorisés et interdits.

### Phase 5 — Paiement sandbox, livraison et notifications

- [ ] Définir les interfaces `PaymentProvider`, `ShippingProvider`, `EmailProvider` et leurs erreurs.
- [ ] Ajouter un adaptateur sandbox/mock impossible à confondre avec la production.
- [ ] Ajouter création de session de paiement, retour vérifié et webhook signé/idempotent.
- [ ] Ne jamais stocker les données de carte ni accepter le statut envoyé par le navigateur.
- [ ] Ajouter livraison, retrait et notifications lorsque leur configuration existe.

### Phase 6 — Administration

- [ ] Dashboard fondé uniquement sur les données réelles.
- [ ] Gestion des produits, catégories, médias, stocks, commandes, clients et promotions.
- [ ] Gestion des contenus et paramètres non secrets.
- [ ] Journal d’audit des actions sensibles sans secrets ni données excessives.
- [ ] Tests d’autorisation sur chaque mutation administrative.

### Phase 7 — Qualité, sécurité et préparation du déploiement

- [ ] Tests Playwright des parcours critiques mobile et desktop.
- [ ] Vérification accessibilité clavier et audit automatisé.
- [ ] En-têtes de sécurité, rate limiting adapté et contrôle des uploads.
- [ ] Audit des dépendances et recherche de secrets.
- [ ] Documentation Vercel/Neon, sauvegardes, restauration et séparation des environnements.
- [ ] Build de production et rapport honnête des contrôles exécutés.

### Phase 8 — Validation humaine avant production

- [ ] Choix du pays, devise, fiscalité et politique de livraison.
- [ ] Validation des textes juridiques et contenus commerciaux.
- [ ] Configuration sécurisée des comptes Neon, Vercel, paiement, e-mail et stockage.
- [ ] Tests sandbox avec les comptes du propriétaire.
- [ ] Validation explicite avant domaine, DNS et publication production.

## Critère de sortie

Une phase est considérée terminée seulement si son code est présent, les contrôles annoncés ont réellement été exécutés, les limites sont documentées et aucun bouton critique ne simule un succès.
