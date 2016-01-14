var router = require('express').Router();
router.get('/',function(req,res){
    res.render('good/index.html');
});
router.get('/confirm',function(req,res){
    res.render('good/confirm.html');
});
module.exports=router;
