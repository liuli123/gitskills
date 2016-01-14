module.exports = function(router) {
  router.get('/express/setting',
             function(req, res) { res.render('account/express/setting.html'); });
};
