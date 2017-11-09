var expess = require('express')
var router = expess.Router()

router.get('/:name', function(req, res){
  res.render('users', {
    name: req.params.name
  })
})

module.exports = router