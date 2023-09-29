const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Login route
router.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }

      const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
        expiresIn: '1h', // Token expiration time
      });

      return res.json({ user, token });
    });
  })(req, res);
});

// Other authentication routes (e.g., registration, logout) can be added here

module.exports = router;


// router.post(
//   '/login',
//   passport.authenticate('local', {
//     successRedirect: '/profile',
//     failureRedirect: '/login',
//     failureFlash: true,
//   })
// );

// router.get('/profile', (req, res) => {
//   if (req.isAuthenticated()) {
//     res.json(req.user);
//   } else {
//     res.status(401).json({ message: 'Unauthorized' });
//   }
// });

// router.get('/logout', (req, res) => {
//   req.logout();
//   res.redirect('/');
// });

