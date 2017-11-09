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
  // 设置 cookie 中保存session id的字段名称
  name: config.session.key,
  // 设置 secre 计算hash并放在cookie中，使产生的signedCookie防篡改
  secret: config.session.secret,
  // 强制更新 session
  resave: true,
  // 设置为 false，强制创建一个 session，即使用户未登录
  saveUninitialized: false,
  cookie: {
    // 过期时间，过期后 cookie 中的 session id 自动删除
    maxAge: config.session.maxAge
  },
  // 将 session 存储到 mongodb
  store: new MongoStore({ url: config.mongodb })
}))

app.use(flash()) // flash 中间件，用来显示通知

routes(app)

app.listen(config.port, function () {
  console.log(`${pkg.name} listening on port ${config.port}`)
})