# Audit du projet après simplification

Date : 31 octobre 2026

## Périmètre retenu

Nova Commerce est une application e-commerce unique : une interface publique, une administration et une base Neon. Les visiteurs consultent les produits et sont redirigés vers WhatsApp. Seul l'administrateur se connecte.

## Architecture vérifiée

- Next.js App Router, React, TypeScript strict et Tailwind CSS.
- PostgreSQL Neon avec Drizzle ORM et migrations versionnées.
- Neon Auth pour la session administrateur.
- Neon Object Storage pour les images.
- Zod pour les entrées des mutations administratives.
- Environnements local, Preview et Production séparés par variables.

## Nettoyage effectué

- Suppression des routes et modules de compte client, panier, checkout, paiement et livraison.
- Suppression des tests et utilitaires propres à ces anciens parcours.
- Suppression du client de transaction devenu inutilisé.
- Retrait des services Neon non nécessaires au périmètre actuel.
- Documentation réécrite pour décrire une application unique et non un produit générique.

## Risques résiduels

- Les anciennes tables de commandes/promotions restent en base afin d'éviter une suppression destructive ; aucune route active ne les expose.
- Le numéro WhatsApp et les secrets d'administration doivent être configurés par environnement.
- Les textes juridiques et le contenu commercial doivent être validés par le propriétaire.
- La publication Production, le domaine et les données réelles restent des actions humaines contrôlées.

