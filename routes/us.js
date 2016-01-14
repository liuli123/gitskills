var router = require('express').Router();
router.get('/about',function(req,res){
    res.render('us/about.html');
});
router.get('/contact',function(req,res){
    res.render('us/contact.html');
});
router.get('/joinus',function(req,res){
    res.render('us/joinus.html');
});
router.get('/statement',function(req,res){
    res.render('us/statement.html');
});
module.exports = router;
