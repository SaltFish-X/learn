var path = require('path')
var express = require('express')
var session = require('express-session')
var MongoStore = require('connect-mongo')(session)
var flash = require('connect-flash')
var config = require('config-lite')(__dirname)
var routes = require('./routes')
var pkg = require('./package')

var app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')))

app.use(session({
  name: config.session.key,   // 设置 cookie 中保存session id的字段名称
  secret: config.session.secret,   // 设置 secre 计算hash并放在cookie中，使产生的signedCookie防篡改
  resave: true,   // 强制更新 session
  saveUninitialized: false,   // 设置为 false，强制创建一个 session，即使用户未登录
  cookie: {
    maxAge: config.session.maxAge     // 过期时间，过期后 cookie 中的 session id 自动删除
  },
  store: new MongoStore({ url: config.mongodb })   // 将 session 存储到 mongodb
}))

app.use(flash()) // flash 中间件，用来显示通知

app.use(require('express-formidable')({
  uploadDir: path.join(__dirname, 'public/img'),
  keepExtensions: true
}))

app.locals.bloh = { title: pkg.name, description: pkg.description }

app.use(function (req, res, next) {
  res.locals.user = req.session.user
  res.locals.success = req.flash('success').toString()
  res.locals.error = req.flash('error').toString()
  next()
})

routes(app)

app.listen(config.port, function () {
  console.log(`${pkg.name} listening on port ${config.port}`)
})