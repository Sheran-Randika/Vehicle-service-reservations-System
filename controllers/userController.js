const User = require('../models/User');

exports.getUserProfile = (req, res) => {
  // Get user profile based on the authenticated user's information
  const userId = req.user.id; // Assuming you have the user's ID in the JWT payload

  User.findByPk(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.json(user);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    });
};
