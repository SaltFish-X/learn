var express = require('express')
var router = express.Router()

var checkNotLogin = require('../middlewares/check').checkLogin

router.get('/', function(req, res, next){
  res.send(req.flash())
})

router.post('/', function(req, res, next){
  res.send(req.flash())
})

module.exports = router