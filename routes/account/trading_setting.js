var express = require('express');
module.exports = function(router) {
  router.get('/trading_setting', function(req, res) {
    res.render('account/trading_setting.html');
  });
};
