## Fonctionnalités

### Backend (API REST - Architecture 3 couches)
- **Couche Routes** : Définition des endpoints API
- **Couche Controllers** : Gestion des requêtes HTTP et validation
- **Couche Services** : Logique métier et interaction avec la base
- **Base de données** : PostgreSQL (sans ORM, requêtes SQL natives)

### Frontend (React)
-  Interface minimaliste avec titre, phrase et bouton
-  Génération aléatoire d'excuses (sans répétition)
-  Composant principal et sous-composant bouton
-  Animations d'entrée (fade in du titre, déplacement)
-  Loader avec temps aléatoire (1-5 secondes)
-  Modal pour ajouter de nouvelles excuses

### Routing
-  `/` - Page principale "Les excuses de dev"
-  `/lost` - Page "I'm lost" avec redirection après 5s
-  `*` - Page d'erreur 404
-  `/:http_code` - Page affichant le message du code HTTP

## 🛠️ Technologies utilisées

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **PostgreSQL** - Système de gestion de base de données

### Frontend
- **React 18** - Framework JavaScript
- **CSS3** - Animations et styles modernes

### Base de données
- **SGBD** : PostgreSQL 13+

## Installation et configuration

### Prérequis
- **Node.js** (version 16+)
- **PostgreSQL** (version 13+)
- **npm** ou yarn


### 1. Installation du projet

```bash
# Cloner le projet
git clone [url-du-repo]
cd excuses-de-dev

# Installer les dépendances
npm run install-all
```

### 2. Configuration du fichier .env

```bash
# Configuration PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_NAME=excuses_dev_db
DB_USER=postgres
DB_PASSWORD=password  

# Configuration serveur
PORT=3001
NODE_ENV=development
```

### 3. Initialisation de la base de données

```bash
# Exécuter le script d'initialisation
npm run db:init
```

### 4. Démarrage de l'application

```bash
# Démarrer backend + frontend simultanément
npm run dev
```

"It works on my machine!" - Excuse #725

