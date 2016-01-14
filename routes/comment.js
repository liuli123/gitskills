var express = require('express');
var router = express.Router();
var request = require('request');
router.post('/:type/:id', function(req, res) {
  var result = {};
  result.status = false;
  result.isLogin = false;
  if (!req.session.user) {
    res.send(result);
    return;
  }
  result.isLogin = true;
  request.post(
      {
        url : req.app.locals.API_HOST + '/comment/' + req.params.type,
        form : {
          token : req.session.user.token,
          content : '{"id":"' + req.params.id + '","content":"' +
                        req.body.content + '","parent":"' + req.body.parent +
                        '"}'
        },
      },
      function(err, httpResponse, body) {
        if (!err && httpResponse.statusCode == 200) {
          result.status = true;
        } else if (err) {
          result.msg = err;
        } else {
          result.msg = JSON.parse(body).error.message;
        };
        res.send(result);
      });
});

router.get('/:type/:id', function(req, res) {
  console.info(req.app.locals.API_HOST + '/comments/' + req.params.type +
               '?id=' + req.params.id);
  var result = {};
  result.status = false;
  request.get(
      {
        url : req.app.locals.API_HOST + '/comments/' + req.params.type +
                  '?id=' + req.params.id
      },
      function(err, httpRes, body) {
        if (!err && httpRes.statusCode == 200) {
          result.status = true;
          result.data = JSON.parse(body);
        }
        res.send(result);
      })

});
module.exports = router;
