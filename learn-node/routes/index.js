module.exports = function (app) {
  app.get('/', (req, res) => { res.redirect('/signin') })
  app.use('/signup', require('./signup'))
  app.use('/signin', require('./signin'))
  app.use('/signout', require('./signout'))
  app.use('/posts', require('./posts'))
  // app.use((req, res) => {
  //   console.info(res.headerSent)
  //   if (!res.headerSent) {
  //     console.info('111') 
  //     res.status(404).render('404')
  //   }
  // })
}