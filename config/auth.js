const User = require('../models/user');

class Auth {
  static strategy(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (user.password != password) { return done(null, false); }
      return done(null, user);
    });
  }

  static serialize(user, done) {
    done(null, user.id);
  }

  static deserialize(id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  }

  static check() {
    return function (req, res, next) {
      if (req.user) {
        next();
      } else {
        res.redirect('/login');
      }
    }
  }

  static logout() {
    return function (req, res, next) {
      req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/login');
      });
    }
  }

}

module.exports = Auth;

// 01912-190374





















// // config/passport.js
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const User = require('../models/user');

// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     User.findOne({ username: username }, function (err, user) {
//       if (err) { return done(err); }
//       if (!user) { return done(null, false, { message: 'Incorrect username.' }); }
//       if (!user.comparePassword(password)) { return done(null, false, { message: 'Incorrect password.' }); }
//       return done(null, user);
//     });
//   }
// ));

// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function(id, done) {
//   User.findById(id, function(err, user) {
//     done(err, user);
//   });
// });

// module.exports = passport;
