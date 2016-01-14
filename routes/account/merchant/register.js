var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
module.exports = function(router) {
  router.get('/merchant/register',
             function(req, res) { res.render('account/merchant/register.html'); });

  router.post('/merchant/_api/upload/', multipartMiddleware, function(req, resp) {
      console.log(req.body,req.file);
     resp.send("true");
   });
};
