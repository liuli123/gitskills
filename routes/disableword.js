var express = require('express');
var router = express.Router();
var request = require("request");
router.get('/check/:word', function(req, res) {
  var result = {};
  result.status = false;
  var word = req.params.word;
  if (undefined == word) {
    result.msg = "词汇为空";
  } else {
    console.info(req.app.locals.API_HOST + '/disableword/can_use?word=' + word);
    request.get(
        {url : req.app.locals.API_HOST + '/disableword/can_use?word=' + word},
        function(err, httpRes, body) {
          if (!err && httpRes.statusCode == 200 && "true" === body) {
            result.status = true;
          }
          res.send(result);
        });
  }
});
module.exports = router;
