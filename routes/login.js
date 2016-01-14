var express = require('express');
var router = express.Router();
var request = require("request");
var httputil = require("./util/http.js");
var validateutil = require("./util/validate.js");
router.get('/', function(req, res) { 
var images = {};
  request.get({url : req.app.locals.API_HOST + '/index_image_group'},
              function(err, httpRes, body) {
                if (!err && httpRes.statusCode == 200) {
                  images = JSON.parse(body);
                }
                res.render('login.html', {next : req.params.from,"img":images});
              });
});
router.get('/:from', function(req, res) {
   var images = {};
  request.get({url : req.app.locals.API_HOST + '/index_image_group'},
              function(err, httpRes, body) {
                if (!err && httpRes.statusCode == 200) {
                  images = JSON.parse(body);
                }
                res.render('login.html', {next : req.params.from,"img":images});
              });
});
router.post('/_api/dologin', function(req, res) {
  httputil.doRequest(req, res,
                     req.app.locals.API_HOST + '/user/signin?username=' +
                         req.body.username + '&password=' + req.body.password,
                     null, null, function(error, response, body) {
                       var result = {};
                       result.status = false;
                       try {
                         if (!error && response.statusCode == 200) {
                           result.status = true;
                           req.session.user = JSON.parse(body);
                           res.cookie('userName', JSON.parse(body).userName);
                         } else {
                           result.msg = JSON.parse(body).error.message;
                         }
                       } catch (e) {
                         result.status = false;
                         result.msg = "登陆异常";
                       } finally {
                         res.send(result);
                       }
                     });
});
module.exports = router;
