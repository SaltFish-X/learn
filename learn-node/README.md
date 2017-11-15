# 对应模块的作用

1. express: web 框架
2. express-session: session 中间件
3. connect-mongo: 将 session 存储于 mongodb，结合 express-session 使用
4. connect-flash: 页面通知提示的中间件，基于 session 实现
5. ejs: 模板
6. express-formidable: 接收表单及文件的上传中间件
7. config-lite: 读取配置文件
8. marked: markdown 解析
9. moment: 时间格式化
10. mongolass: mongodb 驱动
11. objectid-to-timestamp: 根据 ObjectId 生成时间戳
12. sha1: sha1 加密，用于密码加密
13. winston: 日志
14. express-winston: 基于 winston 的用于 express 的日志中间件

# debug list

  大部分bug都是数据库的bug，使用id的地方应该使用_id