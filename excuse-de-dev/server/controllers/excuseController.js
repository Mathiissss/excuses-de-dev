const ExcuseService = require('../services/excuseService');

class ExcuseController {

  static async getAllExcuses(req, res) {
    try {
      const excuses = await ExcuseService.getAllExcuses();
      
      res.status(200).json({
        success: true,
        count: excuses.length,
        data: excuses
      });
    } catch (error) {
      console.error('Erreur getAllExcuses:', error);
      res.status(500).json({
        success: false,
        error: 'Erreur serveur lors de la récupération des excuses',
        message: error.message
      });
    }
  }

  static async getRandomExcuse(req, res) {
    try {
      const excuse = await ExcuseService.getRandomExcuse();
      
      if (!excuse) {
        return res.status(404).json({
          success: false,
          error: 'Aucune excuse trouvée'
        });
      }

      res.status(200).json({
        success: true,
        data: excuse
      });
    } catch (error) {
      console.error('Erreur getRandomExcuse:', error);
      res.status(500).json({
        success: false,
        error: 'Erreur serveur lors de la récupération d\'une excuse aléatoire',
        message: error.message
      });
    }
  }

  static async getExcuseByCode(req, res) {
    try {
      const { code } = req.params;
      const httpCode = parseInt(code);

      if (isNaN(httpCode) || httpCode < 100 || httpCode > 999) {
        return res.status(400).json({
          success: false,
          error: 'Code HTTP invalide. Doit être un nombre entre 100 et 999'
        });
      }

      const excuse = await ExcuseService.getExcuseByHttpCode(httpCode);
      
      if (!excuse) {
        return res.status(404).json({
          success: false,
          error: `Aucune excuse trouvée pour le code HTTP ${httpCode}`
        });
      }

      res.status(200).json({
        success: true,
        data: excuse
      });
    } catch (error) {
      console.error('Erreur getExcuseByCode:', error);
      res.status(500).json({
        success: false,
        error: 'Erreur serveur lors de la récupération de l\'excuse',
        message: error.message
      });
    }
  }

  static async createExcuse(req, res) {
    try {
      const { tag, message, httpCode } = req.body;

      if (!tag || !message) {
        return res.status(400).json({
          success: false,
          error: 'Les champs "tag" et "message" sont obligatoires'
        });
      }

      if (tag.length > 100) {
        return res.status(400).json({
          success: false,
          error: 'Le tag ne peut pas dépasser 100 caractères'
        });
      }

      if (message.length > 1000) {
        return res.status(400).json({
          success: false,
          error: 'Le message ne peut pas dépasser 1000 caractères'
        });
      }

      let finalHttpCode = httpCode;
      if (!finalHttpCode) {
        finalHttpCode = await ExcuseService.generateNextHttpCode();
      }

      if (isNaN(finalHttpCode) || finalHttpCode < 100 || finalHttpCode > 999) {
        return res.status(400).json({
          success: false,
          error: 'Code HTTP invalide. Doit être un nombre entre 100 et 999'
        });
      }

      const newExcuse = await ExcuseService.createExcuse({
        httpCode: finalHttpCode,
        tag: tag.trim(),
        message: message.trim()
      });

      res.status(201).json({
        success: true,
        message: 'Excuse créée avec succès',
        data: newExcuse
      });
    } catch (error) {
      console.error('Erreur createExcuse:', error);
      
      if (error.message.includes('existe déjà')) {
        return res.status(409).json({
          success: false,
          error: error.message
        });
      }

      res.status(500).json({
        success: false,
        error: 'Erreur serveur lors de la création de l\'excuse',
        message: error.message
      });
    }
  }

  static async updateExcuse(req, res) {
    try {
      const { code } = req.params;
      const { tag, message } = req.body;
      const httpCode = parseInt(code);

      if (isNaN(httpCode) || httpCode < 100 || httpCode > 999) {
        return res.status(400).json({
          success: false,
          error: 'Code HTTP invalide'
        });
      }

      if (!tag && !message) {
        return res.status(400).json({
          success: false,
          error: 'Au moins un champ (tag ou message) doit être fourni'
        });
      }

      const updatedExcuse = await ExcuseService.updateExcuse(httpCode, {
        tag: tag?.trim(),
        message: message?.trim()
      });

      if (!updatedExcuse) {
        return res.status(404).json({
          success: false,
          error: `Aucune excuse trouvée pour le code HTTP ${httpCode}`
        });
      }

      res.status(200).json({
        success: true,
        message: 'Excuse mise à jour avec succès',
        data: updatedExcuse
      });
    } catch (error) {
      console.error('Erreur updateExcuse:', error);
      res.status(500).json({
        success: false,
        error: 'Erreur serveur lors de la mise à jour de l\'excuse',
        message: error.message
      });
    }
  }

  static async deleteExcuse(req, res) {
    try {
      const { code } = req.params;
      const httpCode = parseInt(code);

      if (isNaN(httpCode) || httpCode < 100 || httpCode > 999) {
        return res.status(400).json({
          success: false,
          error: 'Code HTTP invalide'
        });
      }

      const deleted = await ExcuseService.deleteExcuse(httpCode);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          error: `Aucune excuse trouvée pour le code HTTP ${httpCode}`
        });
      }

      res.status(200).json({
        success: true,
        message: `Excuse ${httpCode} supprimée avec succès`
      });
    } catch (error) {
      console.error('Erreur deleteExcuse:', error);
      res.status(500).json({
        success: false,
        error: 'Erreur serveur lors de la suppression de l\'excuse',
        message: error.message
      });
    }
  }

  static async getStatistics(req, res) {
    try {
      const stats = await ExcuseService.getStatistics();
      
      res.status(200).json({
        success: true,
        data: stats
      });
    } catch (error) {
      console.error('Erreur getStatistics:', error);
      res.status(500).json({
        success: false,
        error: 'Erreur serveur lors de la récupération des statistiques',
        message: error.message
      });
    }
  }
}

module.exports = ExcuseController;