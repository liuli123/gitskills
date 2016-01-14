var express = require('express');
var router = express.Router();
var request = require('request');
var httputil = require("../util/http.js");

router.get('/', function(req, res) {
  var recommend;
  var search = req.query.search || "";
  httputil.doRequest(req, res,
    req.app.locals.API_HOST + "/products/recommends?count=6",
    null, null,
    function(error, response, body) {
      if (!error && response.statusCode == 200) {
        recommend = JSON.parse(body);
      }
      res.render('product/list.html', {
        "recommend": recommend,
        "search": search
      });
    });

});

router.get('/:id', function(req, res) {
  var product;
  var recommendReview;
  var getProduct = function(callback) {
    httputil.doRequest(req, res,
      req.app.locals.API_HOST + "/product?id=" + req.params.id,
      null, null,
      function(error, response, body) {
        try {
          if (!error && response.statusCode == 200) {
            product = JSON.parse(body);
            callback();
          } else {
            throw "";
          }
        } catch (e) {
          res.redirect("/product");
        } finally {}
      });
  };
  var getRecommetReview = function(callback) {
    request.get({
        url: req.app.locals.API_HOST +
          "/wordpress/posts?page=1&count=7"
      },
      function(err, httpRes, body) {
        if (!err && httpRes.statusCode == 200) {
          recommendReview = JSON.parse(body).posts;
        }
        callback();
      });
  };
  getProduct(function() {
    getRecommetReview(function() {
      res.render(
        'product/detail.html', {
          id: req.params.id,
          "pro": product,
          "recommend": recommendReview
        });
    });
  });
});

router.get('/_api/products', function(req, res) {
  var page = req.query.page || 1;
  var query = req.query.query || "";
  var keys = req.query.keys || [];
  var keysq = "";
  if ("string" == typeof(keys)) {
    keysq = "&search=" + keys;
  } else {
    for (var i = 0; i < keys.length; i++) {
      keysq = keysq + "&search=" + keys[i];
    }
  }

  var os = req.query.order;
  var osq = "";
  if (undefined != os) {
    var fe = os.split("/");
    for (var i = 0; i < fe.length; i++) {
      osq += "&order=" + fe[i];
    }
  }
  var result = {};
  result.status = false;
  httputil.doRequest(req, res,
    req.app.locals.API_HOST + "/products/list?count=20&page=" +
    page + "&query=" + encodeURI(query) + keysq + osq,
    null, null,
    function(error, response, body) {
      try {
        if (!error && response.statusCode == 200) {
          result.data = JSON.parse(body);
          result.status = true;
        } else {
          result.msg = JSON.parse(body).error.message;
        }
      } catch (e) {
        result.status = false;
        result.msg = "获取数据异常";
      } finally {
        res.send(result);
      }
    });
});

router.get('/_api/searchkey', function(req, res) {
  var result = {};
  var exclude = req.query.exclude || [];
  var exul = "";
  if ('string' == typeof(exclude)) {
    exul = exul + "&exclude=" + exclude;
  } else {
    for (var i = 0; i < exclude.length; i++) {
      exul = exul + "&exclude=" + exclude[i];
    }
  }
  result.status = false;
  httputil.doRequest(req, res,
    req.app.locals.API_HOST + "/products/keys?query=" +
    req.query.query + exul,
    null, null,
    function(error, response, body) {
      try {
        if (!error && response.statusCode == 200) {
          result.data = JSON.parse(body);
          result.status = true;
        } else {
          result.msg = JSON.parse(body).error.message;
        }
      } catch (e) {
        result.status = false;
        result.msg = "获取数据异常";
      } finally {
        res.send(result);
      }
    });
});

router.get('/_api/stock/:id', function(req, res) {
  var result = {};
  result.status = false;
  request.get({
    url: req.app.locals.API_HOST + '/product/stock?product=' + req.params
      .id + '&page=' + req.query.page + '&count=' + req.query.count,
  }, function(error, httpResponse, body) {
    if (!error && httpResponse.statusCode == 200) {
      result.status = true;
      result.data = JSON.parse(body);
    }
    res.send(result);
  });
});

module.exports = router;
