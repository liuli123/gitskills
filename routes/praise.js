var express = require('express');
var router = express.Router();
var httputil = require("./util/http.js");
var request = require('request');
router.get('/:type/:id', function(req, res) {
  var result = {};
  result.status = false;
  result.isLogin = true;
  if (!req.session.user) {
    result.isLogin = false;
    res.send(result);
  } else {
    httputil.doRequest(req, res,
                       req.app.locals.API_HOST + "/praise/" + req.params.type +
                           '?id=' + req.params.id + "&token=" +
                           req.session.user.token,
                       null, null, function(error, response, body) {
                         try {
                           if (!error && response.statusCode == 200) {
                             result.status = true;
                           } else {
                             result.msg = JSON.parse(body).error.message;
                           }
                         } catch (e) {
                           result.status = false;
                           result.msg = "服务器异常：" + e;
                         } finally {
                           res.send(result);
                         }
                       });
  }
});
module.exports = router;
