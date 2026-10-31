# Plan de réalisation de Nova Commerce

Nova Commerce est une application e-commerce unique. Les visiteurs consultent les produits et contactent l'administrateur sur WhatsApp. Il n'y a ni compte client, ni panier, ni commande, ni paiement, ni livraison.

## Phases réalisées

### Phase 0 — Audit et cadrage

- [x] Inspecter le dépôt, l'historique Git et la configuration Neon.
- [x] Définir l'architecture de l'application et ses environnements.
- [x] Documenter les limites et les interventions humaines restantes.

### Phase 1 — Socle technique

- [x] Next.js App Router, React, TypeScript strict et Tailwind CSS.
- [x] Design sombre, responsive, accessible et personnalisable.
- [x] Variables d'environnement documentées et secrets exclus de Git.
- [x] Préparation Vercel/Neon et stockage durable pour les images.

### Phase 2 — Catalogue PostgreSQL

- [x] Modèle catégories, produits, variantes et disponibilité.
- [x] Migrations Drizzle appliquées sur la branche Neon de développement.
- [x] Catalogue public par catégorie, recherche et filtres de prix.
- [x] Fiche produit avec prix et état de disponibilité.

### Phase 3 — Contact WhatsApp

- [x] Génération serveur d'un lien WhatsApp avec message prérempli.
- [x] Message encodé avec le produit consulté.
- [x] État explicite lorsque le numéro WhatsApp n'est pas configuré.

### Phase 4 — Administration

- [x] Connexion Neon Auth réservée à l'administrateur.
- [x] Autorisation serveur par liste `ADMIN_EMAILS`.
- [x] Création, modification, archivage et consultation des produits.
- [x] Upload d'images vers Neon Object Storage avec URL présignée.

### Phase 5 — Qualité et sécurité

- [x] Validation Zod des mutations d'administration.
- [x] En-têtes de sécurité et séparation des secrets serveur/client.
- [x] Vérifications lint, typecheck, tests, build, audit npm et routes HTTP critiques.
- [x] Documentation de déploiement, sécurité et checklist de production.

## Suite contrôlée

- [ ] Le propriétaire configure le numéro WhatsApp public dans Vercel.
- [ ] Le propriétaire crée/configure le compte Neon Auth administrateur.
- [ ] Le propriétaire renseigne `ADMIN_EMAILS` et les secrets de chaque environnement.
- [ ] Le propriétaire valide les contenus commerciaux et juridiques.
- [ ] La publication Production et le domaine restent soumis à validation humaine.

## Règle de migration

Les anciennes tables de commande et de promotion sont conservées dans la base pour éviter une suppression destructive. Elles ne sont plus utilisées par l'application. Leur suppression nécessitera une validation explicite et une migration dédiée.

