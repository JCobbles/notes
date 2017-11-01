var passport = require('passport');

module.exports = {
  login: passport.authenticate('login', {
    successRedirect: '/home',
    failureRedirect: '/',
    failureFlash : true 
  }),

  register: passport.authenticate('signup', {
    successRedirect: '/home',
    failureRedirect: '/signup',
    failureFlash : true 
  }),
}