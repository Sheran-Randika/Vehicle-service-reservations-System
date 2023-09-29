const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const { Strategy: JWTStrategy, ExtractJwt } = passportJWT;
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const sequelize = require('./config/database'); // Assuming you have a Sequelize configuration file

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY || 'your_default_secret_key';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: SECRET_KEY, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Passport.js setup for local authentication
passport.use(
  new LocalStrategy((username, password, done) => {
    // Implement logic to authenticate the user against your database
    // Example: User.findOne({ username }, (err, user) => { ... });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // Implement logic to fetch user details by ID from your database
  // Example: User.findById(id, (err, user) => { ... });
});

// Passport.js setup for JWT authentication
const JWT_SECRET = process.env.JWT_SECRET || 'your_default_jwt_secret';

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
    },
    (jwtPayload, done) => {
      // Implement logic to authenticate the user using JWT
      // Example: User.findById(jwtPayload.id, (err, user) => { ... });
    }
  )
);

// Import and use your route handlers here (auth, reservations, users)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
