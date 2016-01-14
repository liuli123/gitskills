var express = require('express');
module.exports = function(router) {
  router.get('/safety',
             function(req, res) { res.render('account/safety.html'); });
};
