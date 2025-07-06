const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'excuses_dev_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Test de connexion
pool.on('connect', () => {
  console.log('Connexion à PostgreSQL établie');
});

pool.on('error', (err) => {
  console.error('Erreur de connexion PostgreSQL:', err);
  process.exit(-1);
});

const testConnection = async () => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    console.log('Test de connexion réussi:', result.rows[0].now);
    client.release();
    return true;
  } catch (err) {
    console.error('Échec du test de connexion:', err);
    return false;
  }
};

module.exports = {
  pool,
  testConnection
};