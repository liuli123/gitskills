module.exports = function(router) {
  router.get('/express/freight',
             function(req, res) { res.render('account/express/freight.html'); });
};
