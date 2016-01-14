var express = require('express');
var fs = require("fs");
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var request = require("request");
var router = express.Router();
var async = require('async');
module.exports = function(router) {
  router.get('/data', function(req, res) {
  var info;
  var province;
  var areas;
  async.parallel([function(callback){
      request.get(req.app.locals.API_HOST+'/user/info?token='+req.session.user.token,function(error,httpResponse,body){
        if (!error&&httpResponse.statusCode==200){
          info=JSON.parse(body);
        }
        callback();
      });
  },
  function(callback){
    request.get(req.app.locals.API_HOST+'/static/province',function(error,httpResponse,body){
      if (!error&&httpResponse.statusCode==200){
        province=body;
      }
      callback();
    });
  },
  function(callback){
    request.get(req.app.locals.API_HOST+'/static/areacodes',function(error,httpResponse,body){
      if (!error&&httpResponse.statusCode==200){
        areas=body;
      }
      callback();
    });
  }],
  function(err, results) {
      res.render('account/data.html',{"info":info,"ye":new Date().getFullYear(),"province":province,"areas":areas});
  });
   });
  router.post('/data/_api/upload/', multipartMiddleware, function(req, resp) {
    var result = {};
    result.status = "error";
    request.post({
      url:req.app.locals.API_HOST+'/user/upload/portrait',
      form:{
        token:req.session.user.token,
        dataurl:req.body.imgUrl,
      }
    },function(error,httpResponse,body){
      if(!error&&httpResponse.statusCode==200){
        result.status = "success";
        result.url=body;
        result.width="";
        result.height="";
      }else {
        result.message="连接服务器异常,异常代码:"+httpResponse.statusCode;
      }
      resp.send(result);
    })
  });

  router.post('/data/_api/update',function(req,res){
    var result = {};
    result.status = false;
    request.post({
      url:req.app.locals.API_HOST+'/user/info/update?token='+req.session.user.token,
      body:JSON.stringify(req.body),
    },function(error,httpResponse,body){
      if (!error&&httpResponse.statusCode==200){
        result.status=true;
      }
      res.send(result);
    });

  });
};
