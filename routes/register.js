var express = require('express');
var router = express.Router();
var request = require("request");
var httputil = require("./util/http.js");
var validateutil = require("./util/validate.js");
router.get('/', function(req, res) {
  var captchMap = {};
  captchMap.code = Math.floor(Math.random() * (10000 + 1));
  captchMap.imgHost = req.app.locals.API_HOST + '/captch/';
  res.render('register.html', {captch : captchMap});
});
router.post('/_api/doregister', function(req, res) {
  var result = {};
  result.status = true;
  var username = req.body.username;
  var password = req.body.password;
  var phone = req.body.phone;
  var verify = req.body.verify;
  if (!validateutil.valiUserName(username)) {
    result.status = false;
    result.msg = "用户名格式不正确";
    res.send(result);
    return;
  }
  if (!validateutil.valiPassword(password)) {
    result.status = false;
    result.msg = "密码格式不正确";
    res.send(result);
    return;
  }
  if (!validateutil.valiPhone(phone)) {
    result.status = false;
    result.msg = "手机格式不正确";
    res.send(result);
    return;
  }
  httputil.doRequest(req, res,
                     req.app.locals.API_HOST + '/user/register?username=' +
                         username + '&phone=' + phone + '&code=' + verify +
                         '&password=' + password,
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
                         result.msg = "服务器异常";
                       } finally {
                         res.send(result);
                       }
                     });
});
router.post("/_api/sendPhoneVerify", function(req, res) {
  httputil.doRequest(
      req, res,
      req.app.locals.API_HOST + '/user/validate/phone?phone=' + req.body.phone,
      null, null, function(error, response, body) {
        var result = {};
        result.status = false;
        try {
          if (!error && response.statusCode == 200) {
            var result = JSON.parse(body);
            if (result.status) {
              httputil.doRequest(
                  req, res, req.app.locals.API_HOST +
                                '/user/verify/phone?phone=' + req.body.phone,
                  null, null, function(error, response, body) {
                    try {
                      if (!error && response.statusCode == 200) {
                        result.status = true;
                      } else {
                        result.msg = JSON.parse(body).error.message;
                      }
                    } catch (e) {
                      resutl.status = false;
                      result.msg = "服务器异常";
                    }
                  });
            } else {
              result.msg = "手机号已经存在";
            }
          } else if (error) {
            throw error;
          } else {
            result.msg = "未知错误";
          }
        } catch (e) {
          result.status = false;
          result.msg = "服务器异常";
        } finally {
          res.send(result);
        }
      });
});
module.exports = router;
