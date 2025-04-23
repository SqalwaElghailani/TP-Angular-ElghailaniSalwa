
# TP Angular : Templates, Bindings et Directives

**Nom** : Salwa Elghailani  
**Master** : Master DevOps et Cloud Computing  
**Année Universitaire** : 2024/2025

---
# Structure de projet TP-Angular-ElghailaniSalwa 

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.8.

## Composants :
      - CatalogComponent : Affiche la liste des produits filtrés.
      - ProductDetailsComponent : Affiche les détails d'un produit sélectionné.
## Services :
      - ProductService : Gère la récupération des produits .
## Modèles :
      - Product : Interface ou classe définissant les propriétés d'un produit (id, nom, prix, quantité, etc.).

# Fonctionnalités Implémentées
## Affichage des Produits :
      Liste filtrée des produits avec quantité > 0 (utilise *ngFor et un filtre dans le composant).
## Style Conditionnel :
     Les produits avec quantité < 10 ont un fond rouge
## Détails des Produits :
      Un bouton "Détails" déclenche l'affichage du composant ProductDetailsComponent.
# Captures d'Écran :
## Liste des Produits :
![alt text](public/assets/images/ListeProduit.png)
## Détails d'un Produit :
![alt text](public/assets/images/DétailsProduit.png)
## Style Conditionnel (Quantité < 10) :
![alt text](public/assets/images/ListeProduitConditionnel.png)
# Notes Supplémentaires :
Code Propre : Respect des conventions Angular (components/services séparés, utilisation de async pour les données).

Test : Vérifié avec "ng test" et "ng lint".

Dépendances : Aucune dépendance externe supplémentaire requise.












## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
