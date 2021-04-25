var express = require('express');
var router = express.Router();
var usersRouter = require('./usersRouter');
var authRouter = require('./authRouter');

var AuthController = require('../controllers').AuthController;
var AuthControllerObj = new AuthController();

let UserService = require('../services/UserService');
let UserServiceObj = new UserService();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Login' });
});

router.get('/dashboard',async function(req, res, next) {
      let result = await UserServiceObj.getAllUser();
  res.render('dashboard', { title: 'Dashboard',users : result });
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
