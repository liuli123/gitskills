var  request = require('request');
module.exports = function(router) {
  router.get('/comment/reply',
             function(req, res) { res.render('account/comment/reply.html'); });
  router.get('/comment/reply/_api/list',function(req, res) {
    var result = {};
    result.status=false;
    request.get(req.app.locals.API_HOST+'/comment/reply?token='+req.session.user.token+'&page='+req.query.page+'&count='+req.query.count,function(error,httpResponse,body){
      if (!error&&httpResponse.statusCode==200){
        result.status=true;
        result.data=JSON.parse(body);
      }
      res.send(result);
    });
  });
};
