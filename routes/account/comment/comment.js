var request = require('request');
module.exports = function(router) {
  router.get('/comment/comment', function(req, res) {
    res.render('account/comment/comment.html');
  });

  router.get('/comment/_api/list/',function(req,res){
    var result = {};
    result.status=false;
    var page = req.query.page||1;
    var count = req.query.count||10;
    request.get({url:req.app.locals.API_HOST+'/comments/user/'+(req.query.type||'')+'?token='+req.session.user.token+'&page='+page+'&count='+count},function(error,httpResponse,body){
      if (!error&&httpResponse.statusCode==200){
        result.status=true;
        result.data=JSON.parse(body);
      }
      res.send(result)
    });
  });
};
