var express = require('express');
var router = express.Router();
var usersRouter = require('./usersRouter');
var CustomerRouter = require('./CustomerRouter');
var TestingRouter = require('./TestingRouter');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/users', usersRouter);
router.use('/customers', CustomerRouter);
router.use('/testings', TestingRouter);

module.exports = router;
