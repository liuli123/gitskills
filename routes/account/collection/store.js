var express = require('express');
module.exports = function(router) {
  router.get('/collection/store', function(req, res) {
    res.render('account/collection/store.html');
  });
};
