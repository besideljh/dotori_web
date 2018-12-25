const User = require('../models/User.js');
const passport = require('passport');
const config = require('./../config/Config');
const Strategy = require('passport-naver').Strategy;

module.exports.controller = (app) => {
  // facebook strategy
  passport.use(new Strategy({
      clientID: config.NAVER_APP_ID,
      clientSecret: config.NAVER_APP_SECRET,
      callbackURL: 'https://dotori.ga/login/naver/return'
    },
    function (accessToken, refreshToken, profile, cb) {
      const email = profile.emails[0].value;
      User.getUserByEmail(email, (err, user) => {
        if (!user) {
          const newUser = new User({
            fullname: profile.displayName,
            email,
            naver: profile._json,
          });
          
          User.createUser(newUser, (error) => {
            if (error) {
              // Handle error
            }
            return cb(null, user);
          });
        } else {
          return cb(null, user);
        }
        return true;
      });
    }));

  app.get('/login/naver',
    passport.authenticate('naver', {
      scope: ['email']
    }));

  app.get('/login/naver/return', passport.authenticate('naver', {
    failureRedirect: '/login'
  }), (req, res) => {
    res.redirect('/');
  });
};
