var express = require('express');
var router = express.Router();
router.get('/',function(req,res){
  res.send('/safe/check.html');
});
module.exports=router;
