var express = require('express');
module.exports = function(router) {
  router.get('/collection/commodity', function(req, res) {
    res.render('account/collection/commodity.html');
  });
};
