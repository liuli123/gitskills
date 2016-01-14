var express = require('express');
module.exports = function(router) {
  router.get('/collection/onsale', function(req, res) {
    res.render('account/collection/onsale.html');
  });
};
