var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
/* GET users listing. */
router.post('/createClient', userController.createClient);
router.post('/createAdmin', userController.createAdmin);
router.get('/getAllUsers', userController.getAllUsers);
router.get('/getClient', userController.getClient);
router.get('/getAdmin', userController.getAdmin);
router.delete('/deleteUserById/:id',userController.deleteUserById);
router.put('/updateByID/:id',userController.updateByID);
router.get("/:id/commandes", userController.getUserWithCommandes);
module.exports = router;
