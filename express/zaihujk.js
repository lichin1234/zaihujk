var express = require('express')
    ,favicon = require('serve-favicon')
    ,path = require('path')
    ,bodyParser = require('body-parser')
    ,logger = require('morgan')
    ,exphbs = require('express-handlebars');

var app = express();
// 定制环境
app.set('port', process.env.PORT || 3000);
// 模板引擎
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs({
  layoutsDir: 'views',
  defaultLayout: 'layout',
  partialsDir: 'views/common/',
  extname: '.hbs'
}));
app.set('view engine', 'hbs');

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));//加载日志中间件
app.use(bodyParser.json());//加载解析JSON的中间件
app.use(bodyParser.urlencoded({extended: false}));//加载解析urlencoded请求体的中间件
// app.use(express.methodOverride());
app.use('/static', express.static(path.join(__dirname, 'public')));

// development only
// if ('development' == app.get('env')) {
//   app.use(express.errorHandler());
// }

// add routes
require('./routes.js')(app);
app.use(function(req, res) {
  res.type('text/plain');
  res.status(404);
  res.send('404--Not Found');
});
app.listen(app.get('port'), function() {
  console.log('Express started on ' + app.get('port') + '; press Ctrl-C to terminate');
});
