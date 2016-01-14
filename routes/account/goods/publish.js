var express = require('express');
var httpUtil = require('../../util/http');
var request  = require('request');
module.exports = function(router) {
  router.get('/goods/publish',
             function(req, res) { res.render('account/goods/publish.html'); });

  router.get('/goods/publish/_api/products/:query', function(req, res) {
    httpUtil.doRequest(req, res, req.app.locals.API_HOST + "/products?query=" +
                                     req.params.query,
                       null, null, function(error, response, body) {
                         var result = {};
                         result.status = false;
                         if (!error && response.statusCode == 200) {
                           result.data = JSON.parse(body).products;
                           result.status = true;
                         }
                         res.send(result);
                       });
  });

  router.get('/goods/publish/_api/inventory/check/:proid', function(req, res) {
    var r = false;
    request.get({
      url:req.app.locals.API_HOST+'/inventory/hasInventory?&proid='+req.params.proid+'&token='+req.session.user.token,
    },function(error,httpResponse,body){
      res.send(r);
    });
  });

  router.post('/goods/publish/_api/inventory/publish',function(req,res){
    var qbod = {};
    var ps = req.body.data.split('_');
    for (var i = 0; i < ps.length; i++) {
      var se = ps[i];
      var proid = se.split(':')[0];
      var sizes = se.split(':')[1];
      if (undefined!=se.split(':')[1]){
        var sife =se.split(':')[1].split(',');
        for (var _i in sife) {
          if (sife[_i]!=null&&sife[_i]!=undefined&&sife[_i].length>0){
            var pM = qbod[proid];
            if (null==pM||undefined==pM){
              pM = [];
            }
            var pserdf={};
            pserdf.size=sife[_i];
            pserdf.count=req.body[proid+'_'+sife[_i]+'_count'];
            pserdf.dprice=req.body[proid+'_'+sife[_i]+'_dprice'];
            pserdf.lprice=req.body[proid+'_'+sife[_i]+'_lprice'];
            pserdf.weight=req.body[proid+'_'+sife[_i]+'_weight'];
            pM[pM.length] = pserdf;
            qbod[proid]=pM;
          }
        }
      }
    }
    request.post({
      url:req.app.locals.API_HOST+'/inventory/publish?token='+req.session.user.token,
      body : JSON.stringify(qbod),
    },function(error,httpResponse,body){
      var r = {};
      r.status=false;
      if (!error&&httpResponse.statusCode==200){
        r.status=true;
      }
      res.send(r);
    });
  });

};
