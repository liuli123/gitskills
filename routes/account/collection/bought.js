var express = require('express');
module.exports = function(router) {
  router.get('/collection/bought', function(req, res) {
    res.render('account/collection/bought.html');
  });
};
