var express = require('express');
var router = express.Router();
var httputil = require("./util/http.js");
var request = require('request');
router.get('/index',
           function(req, res) { res.redirect('/account/collection/product'); });
router.get('/:type/:id', function(req, res) {
  var result = {};
  result.status = false;
  result.isLogin = true;
  if (!req.session.user) {
    result.isLogin = false;
    res.send(result);
  } else {
    httputil.doRequest(req, res,
                       req.app.locals.API_HOST + "/" + req.params.type +
                           '/collection?id=' + req.params.id + "&token=" +
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
router.get('/_api/list/:type', function(req, res) {
  var result = {};
  var cpage = req.query.page || 1;
  var ccount = req.query.count || 10;
  result.status = false;
  result.isLogin = true;
  if (!req.session.user) {
    result.isLogin = false;
    res.send(result);
  } else {
    httputil.doRequest(req, res,
                       req.app.locals.API_HOST + "/" + req.params.type +
                           's/collections?token=' + req.session.user.token +
                           '&page=' + cpage + '&count=' + ccount,
                       null, null, function(error, response, body) {
                         try {
                           if (!error && response.statusCode == 200) {
                             result.status = true;
                             result.data = JSON.parse(body);
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
router.post('/delete/:type', function(req, res) {
  var result = {};
  result.status = false;
  result.isLogin = false;
  if (req.session.user == undefined && req.session.user == null) {
    res.send(result);
    return;
  } else {
    result.isLogin = true;
    var ids = req.query.id || [];
    var u = '';
    if ('string' == typeof(ids)) {
      u = u + '&id=' + ids;
    } else {
      for (var i = 0; i < ids.length; i++) {
        u = u + '&id=' + ids[i];
      }
    }
    var url = req.app.locals.API_HOST + '/' + req.params.type +
              '/uncollection?' +
              '&token=' + req.session.user.token + u;
    request({url : url}, function(err, httpResponse, body) {
      if (!err && httpResponse.statusCode == 200) {
        result.status = true;
      }
      res.send(result);
    });
  }
});
module.exports = router;
