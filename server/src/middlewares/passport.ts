import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from '../models/User'; // Adjust the path according to your file structure

dotenv.config();

// Configure Passport to use Google strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Find or create a user based on Google profile
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = await new User({
            googleId: profile.id,
            firstname: profile.name?.givenName,
            lastname: profile.name?.familyName,
            email: profile.emails?.[0].value,
            photo: profile.photos?.[0].value,
          }).save();
        }

        // Generate JWT token
        const token = jwt.sign(
          { userId: user._id, email: user.email }, // Payload
          process.env.JWT_SECRET!, // Secret key
          { expiresIn: '1h' } // Token expiration
        );

        // Pass the token as a part of user
        return done(null, { user, token });
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

export default passport;
