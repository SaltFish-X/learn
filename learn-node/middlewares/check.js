module.exports = {
  checkLogin (req, res, next) {
    if (!req.session.user) {
      req.flash('error', 'Not Login')
      return res.redirect('/signin')
    }
    next()
  },
  checkNotLogin (req, res, next) {
    if (req.session.user) {
      req.flash('error', 'Logined')
      return req.send('ok')
      // return res.redirect('back')
    }
    next()
  }
}