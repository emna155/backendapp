var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const {requireAuthUser}=require('../middlewares/authMiddlewares');
/* GET users listing. */

router.get('/getUseAuth',userController.getUseAuth);
router.post('/login',userController.login);
router.get('/logout', userController.logout);
router.post('/createClient', userController.createClient);
router.post('/createAdmin', userController.createAdmin);
router.get('/getAllUsers',requireAuthUser, userController.getAllUsers);
router.get('/getClient', userController.getClient);
router.get('/getAdmin', userController.getAdmin);
router.delete('/deleteUserById/:id',userController.deleteUserById);
router.put('/updateByID/:id',userController.updateByID);
router.get("/:id/commandes", userController.getUserWithCommandes);
module.exports = router;
