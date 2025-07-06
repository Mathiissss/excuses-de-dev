const express = require('express');
const ExcuseController = require('../controllers/excuseController');

const router = express.Router();

router.get('/', ExcuseController.getAllExcuses);

router.get('/stats', ExcuseController.getStatistics);

router.get('/random', ExcuseController.getRandomExcuse);

router.get('/:code', ExcuseController.getExcuseByCode);

router.post('/', ExcuseController.createExcuse);

router.put('/:code', ExcuseController.updateExcuse);

router.delete('/:code', ExcuseController.deleteExcuse);

module.exports = router;