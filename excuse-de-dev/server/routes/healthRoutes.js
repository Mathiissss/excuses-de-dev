const express = require('express');
const { testConnection } = require('../config/database');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const dbConnected = await testConnection();
    
    const healthStatus = {
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: '1.0.0',
      database: {
        connected: dbConnected,
        type: 'PostgreSQL'
      }
    };

    res.status(200).json({
      success: true,
      message: 'API Excuses de Dev fonctionne!',
      data: healthStatus
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      error: 'Service indisponible',
      message: error.message
    });
  }
});

router.get('/db', async (req, res) => {
  try {
    const connected = await testConnection();
    
    if (connected) {
      res.status(200).json({
        success: true,
        message: 'Base de données accessible',
        database: 'PostgreSQL'
      });
    } else {
      res.status(503).json({
        success: false,
        error: 'Base de données inaccessible'
      });
    }
  } catch (error) {
    res.status(503).json({
      success: false,
      error: 'Erreur de connexion à la base de données',
      message: error.message
    });
  }
});

module.exports = router;