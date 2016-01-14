var express = require('express');
module.exports = function(router) {
  router.get('/collection/sold', function(req, res) {
    res.render('account/collection/sold.html');
  });
};
