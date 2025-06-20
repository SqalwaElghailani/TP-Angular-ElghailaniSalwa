# MangaLighter - Plateforme e-commerce de mangas

**Auteur** : Salwa Elghailani  
**Master** : DevOps et Cloud Computing  
**Année Universitaire** : 2024/2025  
**Encadré par** : Pr. KOUISSI Mohamed  
**Établissement** : Faculté Polydisciplinaire de Larache, Maroc  

---

## Table des matières
1. [Introduction](#introduction)
2. [Technologies utilisées](#technologies-utilisées)
3. [Architecture du projet](#architecture-du-projet)
4. [Fonctionnalités implémentées](#fonctionnalités-implémentées)
5. [Perspectives](#perspectives)
6. [Guide d'installation](#guide-dinstallation)


---

## Introduction

MangaLighter est une application web e-commerce spécialisée dans la vente de mangas physiques. Développée avec Angular, elle offre aux passionnés de mangas une plateforme intuitive pour découvrir, sélectionner et commander leurs œuvres favorites.

Principaux objectifs :
- Digitaliser l'expérience d'achat de mangas
- Simplifier la gestion des commandes
- Garantir la confidentialité des données utilisateurs
- Offrir une interface utilisateur optimisée

---

## Technologies utilisées

### Frontend
- **Angular 19** : Framework frontend modulaire
- **TypeScript** : Typage statique pour une meilleure robustesse
- **HTML5/CSS3** : Structure et style de l'interface
- **RxJS** : Gestion des flux de données asynchrones

### Backend (simulé)
- **JSON** : Stockage des données (produits, utilisateurs, commandes)
- **Node.js/Express** : API REST légère pour la gestion des données

### Outils
- **Angular CLI** : Génération de code et gestion du projet
- **Git** : Versionning du code source

---

## Architecture du projet
![alt text](public/assets/images/architecture.png)

## Principaux composants :
- `CatalogComponent` : Affichage et filtrage des produits
- `ProductDetailsComponent` : Fiche détaillée d'un manga
- `CartComponent` : Gestion du panier

---
## Services :
- `AuthService` : Gestion de l'authentification

---

## Modèles :
 - `Product`: Interface ou classe définissant les propriétés d'un produit (id, nom, prix, quantité, etc.).
 
---
## Fonctionnalités implémentées

### Catalogue interactif
- Affichage des produits avec filtrage (genre, disponibilité)
![alt text](public/assets/images/catalog-1.png)
![alt text](public/assets/images/catalog-2.png)
![alt text](public/assets/images/catalog-genre.png)
- Système de recherche dynamique
![alt text](public/assets/images/catalog-rech-1.png)
![alt text](public/assets/images/catalog-rech-11.png)
- Style conditionnel pour les produits en faible stock (<10 unités)
![alt text](public/assets/images/detail-1.png)
![alt text](public/assets/images/detail-2.png)

### Gestion utilisateur
- Inscription et connexion sécurisées
![alt text](public/assets/images/signin-1.png)
![alt text](public/assets/images/signup.png)
![alt text](public/assets/images/logout.png)
- Espace personnel avec historique des commandes
### Processus d'achat
- Panier modifiable avec sélection multiple
![alt text](public/assets/images/card.png)
![alt text](public/assets/images/card-selected.png)
- Finalisation de commande avec suivi
- Calcul automatique des totaux
![alt text](public/assets/images/commende.png)
### Administration
- Visualisation des commandes en attente
- Possibilité d'annulation des commandes
![alt text](public/assets/images/mes commende.png)


---







## Guide d'installation

### Notes Supplémentaires :
Code Propre : Respect des conventions Angular (components/services séparés, utilisation de async pour les données).

Test : Vérifié avec "ng test" et "ng lint".

Dépendances : Aucune dépendance externe supplémentaire requise.

### Prérequis
- Node.js v18+
- Angular CLI v19+

### Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

### Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

### Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

### Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

### Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

### Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
