var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var template = require('art-template/node/template-native.js');
var compression = require('compression');

template.config('base', '');
template.config('cache', false);
template.config('extname', '.html');
app.engine('.html', template.__express);
app.set('view engine', 'html');
app.set('trust proxy', 'loopback');
app.locals.API_HOST = 'http://api-dev.fastpass.cn';
app.locals.USER_AGENT = 'fastpass frontend v0.1';
app.locals.X_AGENT_ID = '6ff1709f-22d0-4fa4-95c0-a522a7a23c72';
app.use(compression(9));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: '12345', // secret:字符串,用来对session数据进行加密的字符串.这个属性值为必须指定的属性.
  name: 'user', //这里的name值得是cookie的name，默认cookie的name是：connect.sid
  /*cookie: {maxAge: 120000 }, */ //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
  resave: false,
  saveUninitialized: true,
}));
//权限控制
app.use(function(req, res, next) {
  var url = req.path;
  if (req.session.user == undefined && req.session.user == null &&
    url.split("/").length > 1 && url.split("/")[1] == "account") {
    res.redirect("/login/" + encodeURIComponent(url));
  } else {
    next();
  }
});
app.use('/', require("./routes/index"));
app.use('/collection', require("./routes/collection"));
app.use('/comment', require("./routes/comment"));
app.use('/register', require("./routes/register"));
app.use('/login', require("./routes/login"));
app.use('/logout', require("./routes/logout"));
app.use("/review", require('./routes/review/review'));
app.use("/store", require("./routes/store"));
app.use("/product", require("./routes/product/list"));
app.use("/account", require("./routes/account/init")());
app.use('/disableword', require('./routes/disableword'));
app.use('/praise', require('./routes/praise'));
app.use('/user', require('./routes/user'));
app.use('/us', require('./routes/us'));
app.use('/business', require('./routes/business/index'));
app.use('/cart', require('./routes/cart/index'));
app.use('/good', require('./routes/good/index'));
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
    title: 'error'
  });
});
module.exports = app;
