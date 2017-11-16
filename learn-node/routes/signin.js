var sha1 = require('sha1')
var express = require('express')
var router = express.Router()

var UserModel = require('../models/user')
var checkNotLogin = require('../middlewares/check').checkNotLogin

// GET /signin 登陆页
router.get('/', checkNotLogin, function (req, res, next) {
  res.render('signin')
})

// POST /signin 用户登陆
router.post('/', checkNotLogin, function (req, res, next) {
  var name = req.fields.name
  var password = req.fields.password

  UserModel.getUserByName(name)
    .then(function (user) {
      if (!user) {
        req.flash('error', 'user not existed')
        return res.redirect('back')
      }

      if (password !== user.password) {
        req.flash('error', 'password error')
        return res.redirect('back')
      }

      req.flash('sucess', 'signin')
      delete user.password
      req.session.user = user

      res.redirect('/posts')
    })
    .catch(next)
})

module.exports = router
