var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('biolink'); //va a llamar a biolink.hbs
});

module.exports = router;
