const express = require('express');
const router = express.Router();
const UsersController = require('../controllers').UsersController;
const UsersControllerObj = new UsersController();

router.get('/:id', UsersControllerObj.getUserById);
router.patch('/:id', UsersControllerObj.updateUser);
router.delete('/:id', UsersControllerObj.deleteUser);
router.delete('/hard/:id', UsersControllerObj.deleteHardUser);
router.get('/', UsersControllerObj.getAllUsers);
router.post('/', UsersControllerObj.insertUser);

module.exports = router;
