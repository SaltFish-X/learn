var express = require('express')
var router = express.Router()

var checkLogin = require('../middlewares/check').checkLogin

router.get('/', checkLogin, function(req, res, next){
  res.session.user = null
  req.flash('sucess', 'signup out sucess')
  req.redirect('/posts')
})

module.exports = router