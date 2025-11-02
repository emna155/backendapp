var express = require('express');
var router = express.Router();
const categorieController = require('../controllers/categorieController');

router.post('/createCategorie', categorieController.createCategorie);
router.get('/getAllCategorie', categorieController.getAllCategorie);
router.delete('/deleteByname/:nom', categorieController.deleteByname);
router.put('/updateByname/', categorieController.updateByname);

module.exports = router;