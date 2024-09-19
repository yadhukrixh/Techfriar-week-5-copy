import express, { Request, Response } from 'express';
import passport from 'passport';
import { 
  confirmBooking, 
  fetchTickets, 
  fetchUserDetails, 
  handleAdminLogin, 
  razorpayOrder, 
  sendOtp, 
  validateOtp 
} from '../controllers/auth.contollers';

// Create a new Express router instance
const router = express.Router();

// Google OAuth route
// Redirects the user to the Google authentication page
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google OAuth callback route
// Handles the redirect from Google after authentication
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  (req: Request, res: Response) => {
    // Get the authenticated user from the request
    const user = req.user as { token: string }; // Type assertion for req.user

    // Check if the user is authenticated and has a token
    if (user && user.token) {
      // Redirect back to the frontend with the token in the URL as a query parameter
      res.redirect(`http://localhost:3000?token=${user.token}`);
    } else {
      // Return an error response if authentication fails
      res.status(401).json({ message: 'Authentication failed' });
    }
  }
);

// API endpoint to fetch user details
router.post('/fetchUserDetails', fetchUserDetails);

// API endpoint to send OTP
router.post('/sendOtp', sendOtp);

// API endpoint to validate OTP
router.post('/validateOtp', validateOtp);

// API endpoint to create a Razorpay order
router.post('/razorpayOrder', razorpayOrder);

// API endpoint to confirm a booking
router.post('/confirmBooking', confirmBooking);

// API endpoint to fetch tickets
router.post('/fetchTickets', fetchTickets)

// API endpoint to handle admin login
router.post('/handleAdminLogin', handleAdminLogin);

// Export the router instance
export default router;