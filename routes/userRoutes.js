const express = require('express');
const passport = require('passport');
const router = express.Router();
const UserController = require('../controllers/userController');

// Example route for fetching user profile
router.get(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  UserController.getUserProfile
);

module.exports = router;
