const { pool } = require('../config/database');

class ExcuseService {

  static async getAllExcuses() {
    try {
      const query = `
        SELECT id, http_code, tag, message, created_at, updated_at 
        FROM excuses 
        ORDER BY http_code ASC
      `;
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des excuses: ${error.message}`);
    }
  }

  static async getExcuseByHttpCode(httpCode) {
    try {
      const query = `
        SELECT id, http_code, tag, message, created_at, updated_at 
        FROM excuses 
        WHERE http_code = $1
      `;
      const result = await pool.query(query, [httpCode]);
      return result.rows[0] || null;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération de l'excuse ${httpCode}: ${error.message}`);
    }
  }

  static async getRandomExcuse() {
    try {
      const query = `
        SELECT id, http_code, tag, message, created_at, updated_at 
        FROM excuses 
        ORDER BY RANDOM() 
        LIMIT 1
      `;
      const result = await pool.query(query);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Erreur lors de la récupération d'une excuse aléatoire: ${error.message}`);
    }
  }

  static async createExcuse({ httpCode, tag, message }) {
    try {
      const existingExcuse = await this.getExcuseByHttpCode(httpCode);
      if (existingExcuse) {
        throw new Error(`Le code HTTP ${httpCode} existe déjà`);
      }

      const query = `
        INSERT INTO excuses (http_code, tag, message) 
        VALUES ($1, $2, $3) 
        RETURNING id, http_code, tag, message, created_at, updated_at
      `;
      const result = await pool.query(query, [httpCode, tag, message]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Erreur lors de la création de l'excuse: ${error.message}`);
    }
  }

  static async updateExcuse(httpCode, { tag, message }) {
    try {
      const query = `
        UPDATE excuses 
        SET tag = COALESCE($1, tag), 
            message = COALESCE($2, message),
            updated_at = CURRENT_TIMESTAMP
        WHERE http_code = $3 
        RETURNING id, http_code, tag, message, created_at, updated_at
      `;
      const result = await pool.query(query, [tag, message, httpCode]);
      return result.rows[0] || null;
    } catch (error) {
      throw new Error(`Erreur lors de la mise à jour de l'excuse ${httpCode}: ${error.message}`);
    }
  }

  static async deleteExcuse(httpCode) {
    try {
      const query = 'DELETE FROM excuses WHERE http_code = $1';
      const result = await pool.query(query, [httpCode]);
      return result.rowCount > 0;
    } catch (error) {
      throw new Error(`Erreur lors de la suppression de l'excuse ${httpCode}: ${error.message}`);
    }
  }

  static async generateNextHttpCode() {
    try {
      const query = 'SELECT MAX(http_code) as max_code FROM excuses';
      const result = await pool.query(query);
      const maxCode = result.rows[0].max_code || 700;
      return maxCode + 1;
    } catch (error) {
      throw new Error(`Erreur lors de la génération du code HTTP: ${error.message}`);
    }
  }

  static async getStatistics() {
    try {
      const queries = await Promise.all([
        pool.query('SELECT COUNT(*) as total FROM excuses'),
        pool.query(`
          SELECT tag, COUNT(*) as count 
          FROM excuses 
          GROUP BY tag 
          ORDER BY count DESC
        `),
        pool.query(`
          SELECT COUNT(*) as recent 
          FROM excuses 
          WHERE created_at >= NOW() - INTERVAL '7 days'
        `)
      ]);

      return {
        total: parseInt(queries[0].rows[0].total),
        byCategory: queries[1].rows,
        recentlyAdded: parseInt(queries[2].rows[0].recent)
      };
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des statistiques: ${error.message}`);
    }
  }
}

module.exports = ExcuseService;