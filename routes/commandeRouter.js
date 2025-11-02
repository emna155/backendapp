var express = require('express');
var router = express.Router();
const commandeController = require('../controllers/commandeController');


router.post('/createCommande', commandeController.createCommande);
router.get('/getAllCommande', commandeController.getAllCommande);
router.delete('/deleteById/:id', commandeController.deleteById);
router.put('/updateByID/:id', commandeController.updateByID);
module.exports = router;