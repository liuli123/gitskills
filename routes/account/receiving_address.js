var express = require('express');
module.exports = function(router) {
  router.get('/receiving_address', function(req, res) {
    res.render('account/receiving_address.html');
  });
};
