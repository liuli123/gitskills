var express = require('express');
module.exports = function(router) {
  router.get('/pay_setting',
             function(req, res) { res.render('account/pay_setting.html'); });
};
