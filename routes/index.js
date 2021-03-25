var express = require('express');
var router = express.Router();
var usersRouter = require('./usersRouter');
var authRouter = require('./authRouter');

var AuthController = require('../controllers').AuthController;
var AuthControllerObj = new AuthController();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Login' });
});

router.get('/dashboard', function(req, res, next) {
  res.render('dashboard', { title: 'Dashboard' });
});

router.use('/api/auth', authRouter);

/* middleware for token verification begins here */
router.use([
  AuthControllerObj.verifyToken,
  // authController.verifyUser
]);
/* middleware for token verification ends here */

router.use('/api/users', usersRouter);

module.exports = router;
