## Installation et lancement

### Prérequis
- Node.js (version 16+)
- npm ou yarn

### Installation
```bash
# Cloner le projet
git clone [url-du-repo]
cd excuses-de-dev

# Installer les dépendances du projet principal
npm install

# Installer les dépendances du client React
cd client
npm install
cd ..
```

### Lancement en développement
```bash
# Démarrer le serveur backend ET le client React simultanément
npm run dev
```

**Ou séparément :**
```bash
# Terminal 1 - Backend (port 3001)
npm run server

# Terminal 2 - Frontend (port 3000)
npm run client
```

### Accès à l'application
- **Frontend** : http://localhost:3000
- **API Backend** : http://localhost:3001
- **Test API** : http://localhost:3001/api/health

## Build et déploiement

```bash
# Build de production
npm run build

# Les fichiers de production seront dans client/build/
```

"It works on my machine!" - Excuse #725
