var express = require('express');
module.exports = function(router) {
  router.get('/collection/review', function(req, res) {
    res.render('account/collection/review.html');
  });
};
