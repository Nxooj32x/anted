'use strict';
var qiniu = require('qiniu');
var config = require('./config.js');
var express = require('express');
var session = require('express-session');
var timeout = require('connect-timeout');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var AV = require('leanengine');
var filters = require('./routes/filter/Filter');

// 加载云函数定义，你可以将云函数拆分到多个文件方便管理，但需要在主文件中加载它们
require('./cloud');

var app = express();

//定义pjax版本
app.locals.pjaxVersion = config.pjaxVersion;

// 设置模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));

// 设置默认超时时间
app.use(timeout('15s'));

// 加载云引擎中间件
app.use(AV.express());

app.enable('trust proxy');
// 需要重定向到 HTTPS 可去除下一行的注释。
// app.use(AV.Cloud.HttpsRedirect());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Use the session middleware
app.use(session({
////这里的name值得是cookie的name，默认cookie的name是：connect.sid
  //name: 'hhw',
  secret: 'keyboard cat',
  cookie: ('name', 'value', { path: '/', httpOnly: true,secure: false, maxAge:  3000000 }),
  //重新保存：强制会话保存即使是未修改的。默认为true但是得写上
  resave: true,
  //强制“未初始化”的会话保存到存储。
  saveUninitialized: true
}));

app.get('/', function(req, res) {
  res.render('index');
});

// 可以将一类的路由单独保存在一个文件中
app.use('/todos', require('./routes/controller/TodosController'));

app.use('/authentication', require('./routes/controller/AuthenticationController'));

app.use('/editor',filters.sessionFilter, require('./routes/controller/EditorController'));

app.use('/main',filters.sessionFilter,
    require('./routes/controller/MainController')
);


app.use('/career',filters.sessionFilter,
    require('./routes/controller/CareerController')
);

app.use('/imagewall',filters.sessionFilter,
    require('./routes/controller/ImagewallController')
);


var mac = new qiniu.auth.digest.Mac(config.AccessKey, config.SecretKey);
var options = {
  scope: config.Bucket,
  deleteAfterDays: 7,
};
var putPolicy = new qiniu.rs.PutPolicy(options);
var bucketManager = new qiniu.rs.BucketManager(mac, null);

app.get('/uptoken', function(req, res, next) {
  var token = putPolicy.uploadToken(mac);
  res.header("Cache-Control", "max-age=0, private, must-revalidate");
  res.header("Pragma", "no-cache");
  res.header("Expires", 0);
  if (token) {
    res.json({
      uptoken: token
    });
  }
});


app.use(function(req, res, next) {
  // 如果任何一个路由都没有返回响应，则抛出一个 404 异常给后续的异常处理器
  if (!res.headersSent) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  }
});

// error handlers
app.use(function(err, req, res, next) {
  if (req.timedout && req.headers.upgrade === 'websocket') {
    // 忽略 websocket 的超时
    return;
  }

  var statusCode = err.status || 500;
  if (statusCode === 500) {
    console.error(err.stack || err);
  }
  if (req.timedout) {
    console.error('请求超时: url=%s, timeout=%d, 请确认方法执行耗时很长，或没有正确的 response 回调。', req.originalUrl, err.timeout);
  }
  res.status(statusCode);
  // 默认不输出异常详情
  var error = {};
  if (app.get('env') === 'development') {
    // 如果是开发环境，则将异常堆栈输出到页面，方便开发调试
    error = err;
  }
  res.render('error', {
    message: err.message,
    error: error
  });
});

module.exports = app;
