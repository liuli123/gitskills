var express = require('express');
var router = express.Router();
var request = require('request');
var httpu = require('./util/http.js');
router.get('/', function(req, res) {
  var recommed;
  var ip = httpu.getClientIp(req);
  var query = req.query.search || "";
  request.post({
      url: req.app.locals.API_HOST +
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
      } catch (e) {} finally {
        res.render('store/index.html', {
          "recommed": recommed,
          "search": query
        });
      }
    });

});
router.post('/list/_api/searchkey', function(req, res) { //获取搜索条件
  var excludes = req.query.exclude || [];
  var fawe = "";
  if ('string' == typeof(excludes)) {
    fawe = fawe + "&exclude=" + excludes;
  } else {
    for (var i = 0; i < excludes.length; i++) {
      fawe = fawe + "&exclude=" + excludes[i];
    }
  }
  var urlsd =
    req.app.locals.API_HOST + '/stores/keys?query=' + req.query.query +
    fawe;
  request.get({
      url: urlsd,
    },
    function(error, response, body) {
      var result = {};
      result.status = false;
      try {
        if (response.statusCode == 200) {
          result.status = true;
          result.data = JSON.parse(body);

        } else {
          result.msg = JSON.parse(body).error.message;
        }
      } catch (e) {
        result.msg = "获取数据异常";
      } finally {
        res.send(result);
      }
    })
});
router.post('/list/_api/shops', function(req, res) {
  var sfe = "";
  var sear = req.query.keys || [];
  if ('string' == typeof(sear)) {
    sfe = sfe + "&search=" + sear;
  } else {
    for (var i = 0; i < sear.length; i++) {
      sfe = sfe + "&search=" + sear[i];
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
  request.get({
      url: req.app.locals.API_HOST +
        '/stores/list?count=15&city=110100&page=' + req.query.page +
        '&query=' + encodeURI(req.query.query) + sfe + osq,
    },
    function(error, response, body) {
      var result = {};
      result.status = false;
      try {
        if (response.statusCode == 200) {
          result.status = true;
          result.data = JSON.parse(body);
        } else {
          result.msg = JSON.parse(body).error.message;
        }
      } catch (e) {
        result.msg = "获取数据异常";
      } finally {
        res.send(result);
      }
    });
});

router.get('/:id', function(req, res) {
  request.post({
      url: req.app.locals.API_HOST + '/store?id=' + req.params.id,
    },
    function(error, response, body) {
      try {
        if (!error && response.statusCode == 200) {
          res.render('store/detail.html', {
            "shop": JSON.parse(body)
          });
        } else {
          throw "";
        }
      } catch (e) {
        res.redirect("/store");
      }
    });
});

router.get('/_api/stocks/:id', function(req, res) {
  var result = {};
  result.status = false;
  request.get({
    url: req.app.locals.API_HOST + '/store/stock?store=' + req.params.id +
      '&page=' + req.query.page + '&count=' + req.query.count,
  }, function(error, httpResponse, body) {
    if (!error && httpResponse.statusCode == 200) {
      result.status = true;
      result.data = JSON.parse(body);
    }
    res.send(result);
  });
});

module.exports = router;
