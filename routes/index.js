var express = require('express');
var router = express.Router();
var usersRouter = require('./usersRouter');
var authRouter = require('./authRouter');

var AuthController = require('../controllers').AuthController;
var AuthControllerObj = new AuthController();

let UserService = require('../services/UserService');
let UserServiceObj = new UserService();

let UserDashboardController = require('../controllers/renderer/UserDashboardController');
let UserDashboardControllerObj = new UserDashboardController();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Login' });
});

router.use('/api/auth', authRouter);

// router.get('/dashboard/:user_id',async function(req, res, next) {

//   let user_id = req.params.user_id;
//   let result = await UserServiceObj.getAllUserForChat( user_id );
//   res.render('dashboard', { title: 'Dashboard',users : result });
// });

router.get('/dashboard/:user_id', UserDashboardControllerObj.showDashboard );
router.get('/video-call/:room_id?', UserDashboardControllerObj.videoCall );
// const { v4: uuidV4 } = require('uuid');

/* middleware for token verification begins here */
router.use([
  AuthControllerObj.verifyToken,
  // authController.verifyUser
]);
/* middleware for token verification ends here */

router.use('/api/users', usersRouter);

module.exports = router;
