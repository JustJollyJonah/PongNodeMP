var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Pong Node MP' });
});
router.get('/tests', function(req, res, next) {
  res.render('tests', {title: 'Tests'});
});

module.exports = router;
