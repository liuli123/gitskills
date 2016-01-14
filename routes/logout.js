var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
  res.cookie('userName', null,{ maxAge: -1});
  req.session.user = null;
  res.redirect('/login');
});

module.exports=router;
