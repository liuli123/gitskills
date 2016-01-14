var express = require('express');
var router = express.Router();
router.get('/', function(req, res) {
  res.render('cart/index.html'); 
});
module.exports = router;
