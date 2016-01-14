var express = require('express');
module.exports = function(router) {
  router.get('/remind_setting',
             function(req, res) { res.render('account/remind_setting.html'); });
};
