var express = require('express');
var router = express.Router();
const produitController = require('../controllers/produitController');


router.post('/addProduit', produitController.addProduit);
router.get('/getAllProduit', produitController.getAllProduit);
router.delete('/deleteById/:id', produitController.deleteById);
router.put('/updateByID/:id', produitController.updateByID);
module.exports = router;