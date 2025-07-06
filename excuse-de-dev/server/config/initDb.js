const fs = require('fs');
const path = require('path');
const { pool } = require('./database');

const initializeDatabase = async () => {
  try {
    console.log('Initialisation de la base de données...');
    
    const sqlPath = path.join(__dirname, 'schema.sql');
    const sqlScript = fs.readFileSync(sqlPath, 'utf8');
    
    await pool.query(sqlScript);
    
    console.log('Base de données initialisée avec succès!');
    
    const result = await pool.query('SELECT COUNT(*) as count FROM excuses');
    console.log(`${result.rows[0].count} excuses chargées en base`);
    
    process.exit(0);
  } catch (error) {
    console.error('Erreur lors de l\'initialisation:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  initializeDatabase();
}

module.exports = { initializeDatabase };