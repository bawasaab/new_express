var express = require('express');
var router = express.Router();
var usersRouter = require('./usersRouter');
var authRouter = require('./authRouter');

var AuthController = require('../controllers').AuthController;
var AuthControllerObj = new AuthController();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/auth', authRouter);

/* middleware for token verification begins here */
router.use([
  AuthControllerObj.verifyToken,
  // authController.verifyUser
]);
/* middleware for token verification ends here */

router.use('/users', usersRouter);

module.exports = router;
