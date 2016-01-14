var express = require('express');
module.exports = function(router) {
  router.get('/share_setting',
             function(req, res) { res.render('account/share_setting.html'); });
};
