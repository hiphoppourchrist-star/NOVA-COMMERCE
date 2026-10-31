# Questions ouvertes et décisions humaines

Ces points ne bloquent pas l’initialisation locale. Des valeurs par défaut réversibles seront utilisées et documentées jusqu’à validation.

## À valider avant une boutique réelle

| Sujet | Question | Pourquoi c’est important |
|---|---|---|
| Pays et langue | Dans quel pays la première boutique opérera-t-elle, et quelles langues sont nécessaires ? | Devise, fiscalité, textes légaux et prestataires disponibles |
| Devise et prix | Quelle devise et quelle précision monétaire faut-il utiliser ? | Calculs exacts, affichage et paiement |
| Paiement | Quel fournisseur est contracté par le commerçant ? | Contrat, disponibilité régionale, webhooks et sandbox |
| Livraison | Quelles zones, méthodes, tarifs, délais et règles de retrait ? | Calcul du total et promesse client |
| Fiscalité | Les prix sont-ils TTC ou HT ? Quelles taxes s’appliquent ? | Total fiable et conformité à faire valider |
| Commande invitée | Le checkout invité est-il activé ? | Modèle de compte et données conservées |
| E-mail | Quel fournisseur transactionnel sera utilisé ? | Vérification, réinitialisation et notifications |
| Images | Quel stockage durable sera utilisé ? | Upload administrateur et performance |
| Contenu légal | Qui fournit et valide les mentions légales, CGV, retours et confidentialité ? | L’IA ne peut pas valider le cadre juridique |
| Données | Quelle durée de conservation et quelle procédure de suppression/export ? | Vie privée et obligations locales |

## Hypothèses de travail provisoires

- Le produit initial est déployé séparément pour chaque client ; il n’y a pas de base multi-tenant dans le MVP.
- Le paiement est sandbox/mock tant qu’un fournisseur réel et ses secrets ne sont pas configurés.
- Les données de démonstration, si nécessaires, seront limitées au développement et identifiées comme telles.
- Les suppressions métier seront remplacées par archivage lorsque cela protège l’historique des commandes.
- Une seule devise et une seule langue seront ciblées dans le MVP, avec une configuration extensible.
- Les textes juridiques livrés seront des emplacements clairement marqués à remplacer et ne seront pas présentés comme un avis juridique.

## Intervention du propriétaire requise plus tard

Le propriétaire devra saisir les secrets uniquement dans les variables sécurisées de l’environnement concerné (local, preview ou production). Il ne doit pas les coller dans le chat ni les committer. Aucune action externe, migration distante, paiement réel, configuration DNS ou publication ne sera effectuée sans validation explicite.

## Blocage Neon actuel

Le `neon deploy` du 31 octobre 2026 a été refusé avant application car `aiGateway: true` est incompatible avec le plan Free du projet. Le déploiement n’a pas produit de fichier `.env.local`. Une décision humaine est nécessaire : valider un upgrade payant dans la console Neon, ou retirer temporairement l’AI Gateway de `neon.ts` pour déployer les autres services.
