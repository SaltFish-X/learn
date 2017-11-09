module.exports = {
  checkLogin (req, res, next) {
    if (!req.session.user) {
      req.flash(err, 'Not Login')
      return res.redirect('/signin')
    }
    next()
  },
  checkNotLogin (req, res, next) {
    if (requeset.session.user) {
      req.flash(err, 'Logined')
      return res.redirect('back')
    }
    next()
  }
}