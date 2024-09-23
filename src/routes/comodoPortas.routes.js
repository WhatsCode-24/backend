const express = require('express');
const ComodoPortasController = require('../controllers/comodoPortasController');
const router = express.Router();


router.post('/', ComodoPortasController.createComodoPortas);
router.get('/', ComodoPortasController.getAllComodoPortas);
router.get('/:id', ComodoPortasController.getComodoPortasById);
router.put('/:id', ComodoPortasController.updateComodoPortas);
router.delete('/:id', ComodoPortasController.deleteComodoPortas);

module.exports = router;
