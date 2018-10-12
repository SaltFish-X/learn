var express = require('express')
var router = express.Router()

var checkLogin = require('../middlewares/check').checkLogin

router.get('/', checkLogin, function(req, res, next){
  req.session.user = null
  req.flash('sucess', 'signup out sucess')
  res.redirect('/')
})

module.exports = router