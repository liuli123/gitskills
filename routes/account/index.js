var express = require('express');
var request = require('request');
var httpu = require('../util/http.js');
var async = require('async');
module.exports = function(router) {
  router.get('/', function(req, res) {
    var recommed;
    var pros;
    var user;
    async.parallel([
        function(callback){
          var ip = httpu.getClientIp(req);
          request.post(
              {
                url : req.app.locals.API_HOST +
                          '/stores/recommends?order=size&order_by=desc&count=7' +
                          (null != ip && '::1' != ip ? '&city=' + ip : ''),
              },
              function(error, response, body) {
                try {
                  if (response.statusCode == 200) {
                    recommed = JSON.parse(body);
                  } else {
                    result.msg = JSON.parse(body).error.message;
                  }
                } catch (e) {
                } finally {
                  callback();
                }
              });
        },
        function(callback){
          httpu.doRequest(req, res,
                             req.app.locals.API_HOST + "/products/recommends?count=15",
                             null, null, function(error, response, body) {
                               if (!error && response.statusCode == 200) {
                                 pros = JSON.parse(body).products;
                               }
                               callback();
                             });
        },
        function(callback){
          request.get(req.app.locals.API_HOST+'/user/info?token='+req.session.user.token,function(error,httpResponse,body){
            if (!error&&httpResponse.statusCode==200){
              user = JSON.parse(body);
            }
            callback();
          });
        }
    ],
    function(err, results){
      res.render('account/index.html',
                 {"recommed" : recommed,"products":pros,'user':user});
    });
   });
};
