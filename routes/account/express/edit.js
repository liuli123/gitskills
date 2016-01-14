module.exports = function(router) {
  router.get('/express/edit',
             function(req, res) { res.render('account/express/edit.html'); });
};
