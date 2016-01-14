var express = require('express');
var request=require('request');
module.exports = function(router) {
  router.get('/information',
   function(req, res) {
   res.render('account/information.html',{'phone':req.session.user.phone});
 });
};
