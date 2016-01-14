var express = require('express');
module.exports = function(router) {
  router.get('/collection/warehouse', function(req, res) {
    res.render('account/collection/warehouse.html');
  });
};
