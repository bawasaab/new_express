const express = require('express');
var path = require('path');
const router = express.Router();
const ChatController = require('../controllers').ChatController;
const ChatControllerObj = new ChatController();

router.get('/getAllUsers', ChatControllerObj.getAllUsers);

module.exports = router;