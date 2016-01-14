var express = require('express');
module.exports = function(router) {
  router.get('/collection/product', function(req, res) {
    res.render('account/collection/product.html');
  });
};
