const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const excuseRoutes = require('./routes/excuseRoutes');
const healthRoutes = require('./routes/healthRoutes');

const { testConnection } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

app.use('/api/health', healthRoutes);
app.use('/api/excuses', excuseRoutes);

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API Excuses de Dev - Backend avec architecture 3 couches',
    version: '2.0.0',
    documentation: {
      health: '/api/health',
      excuses: '/api/excuses',
      swagger: 'Non implémenté (optionnel)'
    }
  });
});

app.use((err, req, res, next) => {
  console.error('Erreur non gérée:', err);
  res.status(500).json({
    success: false,
    error: 'Erreur serveur interne',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Une erreur est survenue'
  });
});

app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route non trouvée',
    message: `La route ${req.method} ${req.originalUrl} n'existe pas`
  });
});

const startServer = async () => {
  try {
    console.log('🔄 Test de connexion à la base de données...');
    const dbConnected = await testConnection();
    
    if (!dbConnected) {
      console.error('❌ Impossible de se connecter à la base de données');
      console.log('💡 Assurez-vous que PostgreSQL est démarré et que la base existe');
      console.log('💡 Exécutez "npm run db:init" pour initialiser la base');
      process.exit(1);
    }

    app.listen(PORT, () => {
      console.log('\n ==========================================');
      console.log(`   Serveur API démarré sur le port ${PORT}`);
      console.log(' ==========================================');
      console.log(` API disponible: http://localhost:${PORT}`);
      console.log(` Health check: http://localhost:${PORT}/api/health`);
      console.log(` Excuses: http://localhost:${PORT}/api/excuses`);
      console.log(' ==========================================\n');
    });

  } catch (error) {
    console.error('Erreur lors du démarrage du serveur:', error);
    process.exit(1);
  }
};

process.on('SIGTERM', () => {
  console.log('Signal SIGTERM reçu, arrêt du serveur...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('Signal SIGINT reçu, arrêt du serveur...');
  process.exit(0);
});

startServer();