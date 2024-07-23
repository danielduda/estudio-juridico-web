var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('novedades',{
    bodyClass: 'background-green'
}); 
});

module.exports = router;
