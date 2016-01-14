var express = require('express');
var router = express.Router();
var request = require('request');
var httputil = require("../util/http.js");

/* GET home page. */
router.get('/', function(req, res) {
  var ip = httputil.getClientIp(req);
  request.post(
      {
        url : req.app.locals.API_HOST +
                  '/stores/recommends?order=size&order_by=desc&count=5' +
                  (null != ip && '::1' != ip ? '&city=' + ip : ''),
      },
      function(error, response, body) {
        var stores;
        if (response.statusCode == 200) {
          stores = JSON.parse(body);
        }
        res.render('review/review.html', {"stores" : stores.stores});
      });
});

/* GET home page. */
router.get('/_api/list', function(req, res) {
  var reviews;
  var page = req.query.page | 1;
  var result = {};
  result.status = false;
  httputil.doRequest(req, res,
                     req.app.locals.API_HOST + '/wordpress/posts?page=' + page,
                     null, null, function(error, response, body) {
                       try {
                         if (!error && response.statusCode == 200) {
                           result.status = true;
                           result.data = JSON.parse(body);
                         } else {
                           throw "";
                         }
                       } catch (e) {
                         result.status = false;
                         result.msg = "获取数据异常" + e;
                       } finally {
                         res.send(result);
                       }
                     });
});

router.get('/:id', function(req, res) {
  var review;
  httputil.doRequest(
      req, res, req.app.locals.API_HOST + "/wordpress/post/" + req.params.id,
      null, null, function(error, response, body) {
        try {
          if (!error && response.statusCode == 200) {
            review = JSON.parse(body);
            var ip = httputil.getClientIp(req);
            request.post(
                {
                  url :
                      req.app.locals.API_HOST +
                          '/stores/recommends?order=size&order_by=desc&count=5' +
                          (null != ip && '::1' != ip ? '&city=' + ip : ''),
                },
                function(error, response, body) {
                  var stores;
                  if (response.statusCode == 200) {
                    stores = JSON.parse(body);
                  }
                  res.render('review/detail', {
                    "review" : JSON.parse(body),
                    "review" : review,
                    "stores" : stores.stores
                  });
                });
          } else if (error) {
            console.info(error);
          } else {
            throw "";
          }
        } catch (e) {
          res.redirect("/review");
        }
      });

});

module.exports = router;
