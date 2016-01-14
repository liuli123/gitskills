var request = require("request");
exports.doRequest = function(req, res, url, data, body, callback) {
  var options = {
    url : url,
    headers : {
      'User-Agent' : req.app.locals.USER_AGENT,
      'X-User-Id' : req.app.locals.X_AGENT_ID
    }
  };
  request(options, callback);
};
exports.getClientIp = function(req) {
  return req.headers['x-forwarded-for'] || req.connection.remoteAddress ||
         req.socket.remoteAddress || req.connection.socket.remoteAddress;
};
