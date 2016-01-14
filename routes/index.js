var express = require('express');
var router = express.Router();
var request = require("request");
router.get('/', function(req, res) {
  var images = {};
  request.get({url : req.app.locals.API_HOST + '/index_image_group'},
              function(err, httpRes, body) {
                if (!err && httpRes.statusCode == 200) {
                  images = JSON.parse(body);
                }
                res.render('index.html', {"img" : images});
              });
});
module.exports = router;
