var path = require('path')
var express = require('express')
var session = require('express-session')
var MongoStore = require('connect-mongo')(session)
var flash = require('connect-flash')
var config = require('config-lite')(__dirname)
var routes = require('./routes')
var pkg = require('./package')
// 日志功能
var winston = require('winston')
var expressWinston = require('express-winston')

var app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')))

app.use(session({
  name: config.session.key,   // 设置 cookie 中保存session id的字段名称
  secret: config.session.secret,   // 设置 secre 计算hash并放在cookie中，使产生的signedCookie防篡改
  resave: true,   // 强制更新 session
  saveUninitialized: false,   // 设置为 false，强制创建一个 session，即使用户未登录
  cookie: { maxAge: config.session.maxAge },// maxAge 过期时间，过期后 cookie 中的 session id 自动删除
  store: new MongoStore({ url: config.mongodb })   // 将 session 存储到 mongodb
}))

// flash 中间件，用来显示通知
app.use(flash())

// 处理表单及文件上传的中间件
app.use(require('express-formidable')({
  uploadDir: path.join(__dirname, 'public/img'),
  keepExtensions: true
}))

// 设置模板全局常量
app.locals.blog = { title: pkg.name, description: pkg.description }

// 添加模板必需的三个变量
app.use(function (req, res, next) {
  res.locals.user = req.session.user
  res.locals.success = req.flash('success').toString()
  res.locals.error = req.flash('error').toString()
  next()
})

// 正常请求的日志
// app.use(expressWinston.logger({
//   transports: [
//     new (winston.transports.Console)({ json: true, colorize: true }),
//     new winston.transports.File({ filename: 'logs/success.log' })
//   ]
// }))

// 路由
routes(app)

// 错误请求的日志
// app.use(expressWinston.errorLogger({
//   transports: [
//     new winston.transports.Console({ json: true, colorize: true }),
//     new winston.transports.File({ filename: 'logs/error.log' })
//   ]
// }))

// app.use((err, req, res, next) => {
//   res.render('error', { error: err })
// })

if (module.parent) {
  module.exports = app
} else {
  // 监听端口，启动程序
  app.listen(config.port, function () {
    console.log(`${pkg.name} listening on port ${config.port}`)
  })
}